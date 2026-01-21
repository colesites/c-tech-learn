import { createHighlighter } from "shiki"

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null

export async function highlight(code: string, language: string) {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ["github-dark", "github-light"],
            langs: [
                "html",
                "css",
                "javascript",
                "typescript",
                "json",
                "jsx",
                "python",
                "sql",
                "bash",
            ],
        })
    }

    const highlighter = await highlighterPromise

    return highlighter.codeToHtml(code, {
        lang: language,
        theme: "github-dark",
    })
}
