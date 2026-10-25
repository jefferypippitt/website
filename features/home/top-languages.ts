import "server-only"

const username = "jefferypippitt"

// Languages past this are folded into "Other" so the bar stays readable
const maxLanguages = 10

const query = `
  query ($login: String!, $cursor: String) {
    user(login: $login) {
      repositories(
        first: 100
        after: $cursor
        ownerAffiliations: OWNER
        isFork: false
      ) {
        pageInfo { hasNextPage endCursor }
        nodes {
          languages(first: 100) {
            edges { size node { name color } }
          }
        }
      }
    }
  }
`

type Response = {
  data?: {
    user?: {
      repositories: {
        pageInfo: { hasNextPage: boolean; endCursor: string | null }
        nodes: {
          languages: {
            edges: {
              size: number
              node: { name: string; color: string | null }
            }[]
          }
        }[]
      }
    }
  }
}

async function fetchPage(token: string, cursor: string | null) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username, cursor } }),
    // POSTs with an Authorization header are only cached when opted in
    cache: "force-cache",
    next: { revalidate: 86400 },
  })
  if (!response.ok) return null

  const { data }: Response = await response.json()
  return data?.user?.repositories ?? null
}

export async function getTopLanguages() {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  try {
    // Sum bytes per language across every repo, 100 repos per page
    const totals = new Map<string, { size: number; color: string | null }>()
    let cursor: string | null = null
    do {
      const page = await fetchPage(token, cursor)
      if (!page) return null

      for (const repo of page.nodes) {
        for (const { size, node } of repo.languages.edges) {
          const current = totals.get(node.name)?.size ?? 0
          totals.set(node.name, { size: current + size, color: node.color })
        }
      }
      cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null
    } while (cursor)

    const total = [...totals.values()].reduce((sum, l) => sum + l.size, 0)
    if (total === 0) return null

    const languages = [...totals]
      .sort((a, b) => b[1].size - a[1].size)
      .map(([name, { size, color }]) => ({
        name,
        color,
        percent: (size / total) * 100,
      }))

    if (languages.length <= maxLanguages) return languages

    const shown = languages.slice(0, maxLanguages - 1)
    const other = languages
      .slice(maxLanguages - 1)
      .reduce((sum, l) => sum + l.percent, 0)
    return [...shown, { name: "Other", color: null, percent: other }]
  } catch {
    return null
  }
}
