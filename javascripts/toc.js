function buildTableOfContents() {
  const toc = document.getElementById("toc");
  const headings = document.querySelectorAll("#content h2, #content h3, #content h4, #content h5, #content h6");

  if (!toc || headings.length === 0) return;

  const list = document.createElement("ul");
  list.className = "static-toc";
  const levels = [list];
  let previousLevel = 2;

  headings.forEach((heading) => {
    if (!heading.id) return;

    const level = Number(heading.tagName.substring(1));
    while (level > previousLevel) {
      const nestedList = document.createElement("ul");
      const parentItem = levels[levels.length - 1].lastElementChild;
      if (!parentItem) break;
      parentItem.appendChild(nestedList);
      levels.push(nestedList);
      previousLevel += 1;
    }
    while (level < previousLevel && levels.length > 1) {
      levels.pop();
      previousLevel -= 1;
    }

    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    item.appendChild(link);
    levels[levels.length - 1].appendChild(item);
    previousLevel = level;
  });

  toc.replaceChildren(list);
}

document.addEventListener("DOMContentLoaded", buildTableOfContents);
