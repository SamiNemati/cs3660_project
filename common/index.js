function correctPath(path)
{
    var depth = window.location.pathname.split("/").length -3;
    var prepend = "";
    for(var i=0; i< depth; i++)
    {
        prepend += "../";
    }
    return prepend + path;
}
function updatePaths()
{
    let navLinks = document.querySelectorAll("[include-data]");
    navLinks.forEach((link) =>
    {
        let correctedPath = correctPath(link.getAttribute("include-data"));
        link.setAttribute("include-data", correctedPath);
    });
}

async function include(element, page)
{
    var contentObject = await fetch(page);
    var contentHTML = await contentObject.text();
    element.innerHTML = contentHTML;
}
function includeAll()
{
    updatePaths();
    document.querySelectorAll(
        "[include-data").forEach(
            el => include(el, el.getAttribute("include-data"))
        );
}

