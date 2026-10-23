const username = "jefferypippitt"

export const profileUrl = `https://github.com/${username}`

export async function getContributionCount() {
  try {
    const response = await fetch(
      `https://github.com/users/${username}/contributions`,
      { next: { revalidate: 3600 } }
    )
    if (!response.ok) return null

    const html = await response.text()
    const match = html.match(
      /id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contributions?/
    )
    if (!match) return null

    return Number(match[1].replaceAll(",", ""))
  } catch {
    return null
  }
}
