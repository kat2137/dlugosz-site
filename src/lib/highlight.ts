/**
 * The code viewer's tokeniser, ported from the design prototype.
 * Deliberately small: keywords, strings, comments, numbers and capitalised
 * identifiers, over Python, C# and Arduino C++. Used at build time for the
 * file shown first and in the browser for files loaded on demand, so both
 * paths produce identical markup.
 */

const KEYWORDS = new Set([
  'using', 'namespace', 'public', 'private', 'protected', 'override', 'virtual',
  'string', 'var', 'foreach', 'switch', 'case', 'break', 'continue', 'null',
  'true', 'false', 'this', 'base', 'void', 'int', 'float', 'bool', 'const',
  'char', 'unsigned', 'long', 'uint8_t', 'uint16_t', 'include', 'define', 'new',
  'delete', 'struct', 'static', 'def', 'class', 'return', 'import', 'from',
  'for', 'while', 'if', 'elif', 'else', 'with', 'as', 'in', 'not', 'and', 'or',
  'yield', 'self', 'None', 'True', 'False', 'lambda', 'try', 'except', 'raise',
  'await', 'async',
]);

const TOKEN =
  /(#.*$)|("""[\s\S]*?"""|"[^"]*"|'[^']*')|(\b\d+\.?\d*\b)|([A-Za-z_][A-Za-z0-9_]*)|([^A-Za-z0-9_]+)/g;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Returns the inner HTML for one line of source. */
export function highlightLine(line: string): string {
  let out = '';
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;

  while ((match = TOKEN.exec(line))) {
    const [text] = match;
    let cls = 'tok-word';
    if (match[1]) cls = 'tok-comment';
    else if (match[2]) cls = 'tok-string';
    else if (match[3]) cls = 'tok-number';
    else if (match[4]) {
      cls = KEYWORDS.has(text) ? 'tok-keyword' : /^[A-Z]/.test(text) ? 'tok-type' : 'tok-word';
    } else cls = 'tok-punct';
    out += `<span class="${cls}">${escapeHtml(text)}</span>`;
  }

  return out || ' ';
}

export function toLines(source: string): string[] {
  return source.replace(/\t/g, '    ').split('\n');
}

/**
 * Renders the whole numbered listing for a file.
 *
 * `plain` skips tokenising and emits escaped text instead. The build uses it
 * for the file shown first — the markup is identical, so the browser can
 * highlight it in place without moving anything, and the page ships a
 * fraction of the HTML a fully tokenised listing would need.
 */
export function highlight(source: string, plain = false): string {
  return toLines(source)
    .map(
      (line, i) =>
        `<div class="code__line"><span class="code__num">${String(i + 1).padStart(
          2,
          '0',
        )}</span><span>${plain ? escapeHtml(line) || ' ' : highlightLine(line)}</span></div>`,
    )
    .join('');
}

export function lineCount(source: string): number {
  return toLines(source).length;
}
