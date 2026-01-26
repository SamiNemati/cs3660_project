function correctPath(path)
{
    console.log("current path: ", path);
    var depth = window.location.pathname.split("/").length -2;
    console.log("full pathname: ", window.location.pathname);
    console.log("current depth: ", depth);
    var prepend = "";
    for(var i=0; i< depth; i++)
    {
        prepend += "../";
    }
    console.log("prepended path: ", prepend + path);
    return prepend + path;
}
function updatePaths()
{
    let navLinks = document.querySelectorAll("[data-include]");
    console.log("data-include links: ", [navLinks]);
    navLinks.forEach((link) =>
    {
        let correctedPath = correctPath(link.getAttribute("data-include"));
        console.log("correctedPath: ", correctedPath);
        link.setAttribute("data-include", correctedPath);
    });
    let cssLinks = document.querySelectorAll("#cssLinks");
    cssLinks.forEach((link) =>{
        let correctedPath = correctPath(link.getAttribute("href"));
        link.setAttribute("href", correctedPath);
    });
    let jsLinks = document.querySelectorAll("#jsLinks");
    jsLinks.forEach((link) =>{
        let correctedPath = correctPath(link.getAttribute("src"));
        link.setAttribute("src", correctedPath);
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
        "[data-include").forEach(
            el => include(el, el.getAttribute("data-include"))
        );
}

