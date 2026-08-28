/* =========================================
   PROYECTOS
========================================= */

const defaultProjects = [

    {
        id: 1,

        title: "Dashboard de indicadores",

        category: "Datos",

        description:
            "Dashboard para analizar KPIs, tendencias y métricas de negocio.",

        technologies:
            ["SQL", "Power BI", "Excel"],

        url: "#",

        image: ""
    },


    {
        id: 2,

        title: "Automatización con Python",

        category: "Python",

        description:
            "Automatización de tareas repetitivas y procesamiento de información.",

        technologies:
            ["Python", "Pandas", "CSV"],

        url: "#",

        image: ""
    },


    {
        id: 3,

        title: "Laboratorio de Ciberseguridad",

        category: "Ciberseguridad",

        description:
            "Entorno de práctica para análisis de vulnerabilidades y seguridad.",

        technologies:
            ["Linux", "Networking", "Security"],

        url: "#",

        image: ""
    },


    {
        id: 4,

        title: "Infraestructura IT",

        category: "IT",

        description:
            "Diseño de infraestructura utilizando servidores, redes y virtualización.",

        technologies:
            ["Windows Server", "VMware", "Veeam"],

        url: "#",

        image: ""
    },


    {
        id: 5,

        title: "Consultas SQL",

        category: "Datos",

        description:
            "Colección de consultas SQL para análisis y transformación de información.",

        technologies:
            ["SQL", "Data Analysis"],

        url: "#",

        image: ""
    },


    {
        id: 6,

        title: "Monitorización de red",

        category: "IT",

        description:
            "Proyecto para monitorizar disponibilidad y conectividad de infraestructura.",

        technologies:
            ["Networking", "MikroTik", "Monitoring"],

        url: "#",

        image: ""
    }

];


let projects =
    JSON.parse(
        localStorage.getItem("portfolioProjects")
    ) || defaultProjects;


let currentFilter = "Todos";


/* =========================================
   ELEMENTOS
========================================= */

const projectsContainer =
    document.getElementById(
        "projectsContainer"
    );

const modal =
    document.getElementById("modal");

const addProject =
    document.getElementById("addProject");

const closeModal =
    document.getElementById("closeModal");

const projectForm =
    document.getElementById("projectForm");


/* =========================================
   GUARDAR PROYECTOS
========================================= */

function saveProjects() {

    localStorage.setItem(
        "portfolioProjects",
        JSON.stringify(projects)
    );

}


/* =========================================
   MOSTRAR PROYECTOS
========================================= */

function renderProjects() {

    projectsContainer.innerHTML = "";


    const filteredProjects =
        currentFilter === "Todos"

            ? projects

            : projects.filter(
                project =>
                    project.category === currentFilter
            );


    filteredProjects.forEach(project => {

        const article =
            document.createElement("article");


        article.className =
            "project";


        let image = "";


        if (project.image) {

            image =
                `<img
                    src="${escapeHTML(project.image)}"
                    alt="${escapeHTML(project.title)}"
                >`;

        } else {

            image = "⌘";

        }


        const tags =
            project.technologies
                .map(
                    tech =>
                        `<span>${escapeHTML(tech)}</span>`
                )
                .join("");


        let link = "";


        if (
            project.url &&
            project.url !== "#"
        ) {

            link =
                `<a
                    class="project-link"
                    href="${escapeHTML(project.url)}"
                    target="_blank"
                    rel="noopener"
                >
                    Ver proyecto ↗
                </a>`;

        } else {

            link =
                `<span class="project-link">
                    Proyecto personal
                </span>`;

        }


        article.innerHTML = `

            <div class="project-image">

                ${image}

            </div>


            <div class="project-content">

                <span class="project-category">
                    ${escapeHTML(project.category)}
                </span>

                <h3>
                    ${escapeHTML(project.title)}
                </h3>

                <p>
                    ${escapeHTML(project.description)}
                </p>


                <div class="tags">

                    ${tags}

                </div>


                ${link}

            </div>

        `;


        projectsContainer.appendChild(
            article
        );

    });


}


/* =========================================
   SEGURIDAD HTML
========================================= */

function escapeHTML(value) {

    return String(value).replace(
        /[&<>"']/g,

        character => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"

        }[character])

    );

}


/* =========================================
   FILTROS
========================================= */

const filters =
    document.querySelectorAll(
        ".filter"
    );


filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(
                button =>
                    button.classList.remove(
                        "active"
                    )
            );


            filter.classList.add(
                "active"
            );


            currentFilter =
                filter.dataset.filter;


            renderProjects();

        }
    );

});


/* =========================================
   ABRIR MODAL
========================================= */

addProject.addEventListener(
    "click",
    () => {

        modal.classList.remove(
            "hidden"
        );

    }
);


/* =========================================
   CERRAR MODAL
========================================= */

closeModal.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "hidden"
        );

    }
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            modal.classList.add(
                "hidden"
            );

        }

    }
);


/* =========================================
   AGREGAR PROYECTO
========================================= */

projectForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const formData =
            new FormData(
                projectForm
            );


        const project = {

            id: Date.now(),

            title:
                formData
                    .get("title")
                    .trim(),

            category:
                formData.get(
                    "category"
                ),

            description:
                formData
                    .get("description")
                    .trim(),

            technologies:
                formData
                    .get("technologies")
                    .split(",")
                    .map(
                        item =>
                            item.trim()
                    )
                    .filter(Boolean),

            url:
                formData
                    .get("url")
                    .trim() || "#",

            image:
                formData
                    .get("image")
                    .trim()

        };


        projects.unshift(
            project
        );


        saveProjects();


        currentFilter =
            "Todos";


        filters.forEach(
            filter =>
                filter.classList.remove(
                    "active"
                )
        );


        document
            .querySelector(
                '[data-filter="Todos"]'
            )
            .classList.add(
                "active"
            );


        renderProjects();


        projectForm.reset();


        modal.classList.add(
            "hidden"
        );

    }
);


/* =========================================
   MODO OSCURO / CLARO
========================================= */

const themeButton =
    document.getElementById(
        "themeButton"
    );


let lightMode =
    localStorage.getItem(
        "portfolioTheme"
    ) === "light";


function updateTheme() {

    if (lightMode) {

        document.body.style.setProperty(
            "--background",
            "#f5f7fb"
        );

        document.body.style.setProperty(
            "--surface",
            "#ffffff"
        );

        document.body.style.setProperty(
            "--surface2",
            "#eef1f7"
        );

        document.body.style.setProperty(
            "--text",
            "#151923"
        );

        document.body.style.setProperty(
            "--muted",
            "#5e6878"
        );

        themeButton.textContent =
            "☀";

    } else {

        document.body.style.setProperty(
            "--background",
            "#080b10"
        );

        document.body.style.setProperty(
            "--surface",
            "#10151d"
        );

        document.body.style.setProperty(
            "--surface2",
            "#171e28"
        );

        document.body.style.setProperty(
            "--text",
            "#f2f5f8"
        );

        document.body.style.setProperty(
            "--muted",
            "#9aa6b5"
        );

        themeButton.textContent =
            "☾";

    }

}


themeButton.addEventListener(
    "click",
    () => {

        lightMode =
            !lightMode;


        localStorage.setItem(
            "portfolioTheme",
            lightMode
                ? "light"
                : "dark"
        );


        updateTheme();

    }
);


updateTheme();


/* =========================================
   MENÚ MOBILE
========================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const nav =
    document.getElementById(
        "nav"
    );


menuButton.addEventListener(
    "click",
    () => {

        nav.classList.toggle(
            "open"
        );

    }
);


nav.querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "open"
                );

            }
        );

    });


/* =========================================
   AÑO DEL FOOTER
========================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();


/* =========================================
   INICIAR
========================================= */

renderProjects();