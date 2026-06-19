type MarkdownBlock =
  | {
      type: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    };

function flushParagraph(lines: string[], blocks: MarkdownBlock[]): void {
  if (lines.length === 0) {
    return;
  }

  blocks.push({
    type: "paragraph",
    text: lines.join(" "),
  });
  lines.length = 0;
}

function parseMarkdown(source: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const paragraphLines: string[] = [];
  const lines = source.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) {
      flushParagraph(paragraphLines, blocks);
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph(paragraphLines, blocks);
      blocks.push({
        type: "heading",
        level: 3,
        text: line.slice(4).trim(),
      });
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph(paragraphLines, blocks);
      blocks.push({
        type: "heading",
        level: 2,
        text: line.slice(3).trim(),
      });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph(paragraphLines, blocks);
      const items: string[] = [];

      while (index < lines.length) {
        const current = lines[index].trim();

        if (!current.startsWith("- ")) {
          index -= 1;
          break;
        }

        items.push(current.slice(2).trim());
        index += 1;
      }

      blocks.push({
        type: "list",
        items,
      });
      continue;
    }

    paragraphLines.push(line);
  }

  flushParagraph(paragraphLines, blocks);

  return blocks;
}

interface MarkdownContentProps {
  source: string;
}

export function MarkdownContent({ source }: MarkdownContentProps) {
  const blocks = parseMarkdown(source);

  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "heading") {
          if (block.level === 3) {
            return <h3 key={key}>{block.text}</h3>;
          }

          return <h2 key={key}>{block.text}</h2>;
        }

        if (block.type === "list") {
          return (
            <ul key={key}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return <p key={key}>{block.text}</p>;
      })}
    </>
  );
}
