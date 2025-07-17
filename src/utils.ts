
/**
 * Checks if a resource at the specified URL is available by making a HEAD request.
 *
 * @param url - The URL of the resource to check.
 * @returns A promise that resolves to `true` if the resource is available (HTTP status 200-299), or `false` otherwise.
 *
 * @remarks
 * This function uses the Fetch API to perform a HEAD request, which retrieves only the headers and not the full content.
 * If the request fails due to network issues or an invalid URL, the function logs the error and returns `false`.
 */
export async function isResourceAvailable(url: string): Promise<boolean> {

    // Check if the media exists by making a HEAD request
    try {
        // Use fetch to make a HEAD request to the URL
        const response = await fetch(url, { method: "HEAD" });

        // Check if the response is ok (status code 200-299)
        return response.ok;
    }
    catch (e) {
        // Log the error if the request fails
        // This could be due to network issues, invalid URL, etc.
        console.error("An error occurred while checking media existence:", e);
        return false;
    }
}
