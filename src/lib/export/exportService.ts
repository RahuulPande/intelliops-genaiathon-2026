export interface ColumnDef {
  key: string;
  header: string;
  formatter?: (value: unknown) => string;
}

export interface MarkdownSection {
  type: 'heading' | 'paragraph' | 'table' | 'list' | 'codeblock';
  level?: number;
  content?: string;
  rows?: string[][];
  items?: string[];
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToCSV(
  data: Record<string, unknown>[],
  columns: ColumnDef[],
  filename: string
): void {
  const headers = columns.map(c => c.header).join(',');
  const rows = data.map(row =>
    columns.map(col => {
      const val = row[col.key];
      const formatted = col.formatter ? col.formatter(val) : String(val ?? '');
      return formatted.includes(',') || formatted.includes('"')
        ? `"${formatted.replace(/"/g, '""')}"`
        : formatted;
    }).join(',')
  );
  downloadFile([headers, ...rows].join('\n'), filename, 'text/csv');
}

export function exportToMarkdown(sections: MarkdownSection[], filename: string): void {
  const lines: string[] = [];
  for (const section of sections) {
    switch (section.type) {
      case 'heading':
        lines.push(`${'#'.repeat(section.level ?? 1)} ${section.content ?? ''}`);
        lines.push('');
        break;
      case 'paragraph':
        lines.push(section.content ?? '');
        lines.push('');
        break;
      case 'table':
        if (section.rows && section.rows.length > 0) {
          const [header, ...body] = section.rows;
          lines.push(`| ${header.join(' | ')} |`);
          lines.push(`| ${header.map(() => '---').join(' | ')} |`);
          for (const row of body) {
            lines.push(`| ${row.join(' | ')} |`);
          }
          lines.push('');
        }
        break;
      case 'list':
        for (const item of section.items ?? []) {
          lines.push(`- ${item}`);
        }
        lines.push('');
        break;
      case 'codeblock':
        lines.push('```');
        lines.push(section.content ?? '');
        lines.push('```');
        lines.push('');
        break;
    }
  }
  downloadFile(lines.join('\n'), filename, 'text/markdown');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
