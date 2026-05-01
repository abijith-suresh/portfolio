const TOKEN_PATTERN_TEMPLATE = "\\{\\s*\\{\\s*__TOKEN__\\s*\\}\\s*\\}";

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function replaceTemplateToken(template, token, value) {
  const pattern = new RegExp(TOKEN_PATTERN_TEMPLATE.replace("__TOKEN__", escapeRegex(token)), "g");

  return template.replace(pattern, value);
}

export function replaceTemplateTokens(template, values) {
  return Object.entries(values).reduce(
    (result, [token, value]) => replaceTemplateToken(result, token, value),
    template
  );
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 100);
}

export function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}

export function renderBlogTemplate(template, { title, description, date }) {
  return replaceTemplateTokens(template, {
    TITLE: title,
    DESCRIPTION: description,
    DATE: date,
  });
}

export function renderProjectTemplate(template, { title, description, date, githubUrl, demoUrl }) {
  let rendered = replaceTemplateTokens(template, {
    TITLE: title,
    DESCRIPTION: description,
    DATE_FULL: date,
  });

  rendered = githubUrl
    ? rendered.replace(
        /- \*\*Repository\*\*: \[GitHub\]\(\{\s*\{\s*GITHUB_URL\s*\}\s*\}\)/g,
        `- **Repository**: [GitHub](${githubUrl})`
      )
    : rendered.replace(
        /^- \*\*Repository\*\*: \[GitHub\]\(\{\s*\{\s*GITHUB_URL\s*\}\s*\}\)\n?/gm,
        ""
      );

  rendered = demoUrl
    ? rendered.replace(
        /- \*\*Live Demo\*\*: \[Demo\]\(\{\s*\{\s*DEMO_URL\s*\}\s*\}\)/g,
        `- **Live Demo**: [Demo](${demoUrl})`
      )
    : rendered.replace(/^- \*\*Live Demo\*\*: \[Demo\]\(\{\s*\{\s*DEMO_URL\s*\}\s*\}\)\n?/gm, "");

  return rendered.replace(/\n{3,}/g, "\n\n");
}
