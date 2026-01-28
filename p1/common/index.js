
function correctPath(path)
{
    var parts = window.location.pathname.split("/").filter(part => part);
    var depth = 0;
    for (let i = 0; i < parts.length -2; i++)
    {
        if(parts[i] !== "index" && parts[i] !== "index.html")
        {
            console.log(parts[i]);
            depth += 1;
        }
    }
    var prepend = "";
    for(var i=0; i< depth; i++)
    {
        prepend += "../";
    }
    return prepend + path;
}

async function include(element, page)
{
    var contentObject = await fetch(page);
    var contentHTML = await contentObject.text();
    element.innerHTML = contentHTML;

    let navLinks = element.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        let correctedPath = correctPath(link.getAttribute("href"));
        link.setAttribute("href", correctedPath);
    });
    let logoLink = element.querySelectorAll(".logo");
    logoLink.forEach((link) =>{
        let correctedPath = correctPath(link.getAttribute("src"));
        link.setAttribute("src", correctedPath);
    });


}
function includeAll()
{
    let includeLinks = document.querySelectorAll("[data-include]");
    includeLinks.forEach((link) => {
        let correctedPath = correctPath(link.getAttribute("data-include"));
        link.setAttribute("data-include", correctedPath);
    })

    document.querySelectorAll(
        "[data-include]").forEach(
            el => include(el, el.getAttribute("data-include"))
    );
}
