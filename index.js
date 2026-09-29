/* =========================================
   PROYECTOS
========================================= */

const defaultProjects = [

    {
        id: 1,

        title: "JetBrains Lab - CyberDefenders",

        category: "CiberSeguridad",

        description:
            "Análisis de tráfico de red utilizando Wireshark para identificar la explotación de un servidor web, extraer indicadores de compromiso (IoC), detectar mecanismos de persistencia y relacionar las técnicas observadas con el framework MITRE ATT&CK.",

        technologies:
            ["Wireshark", "PCAP", "Análisis de tráfico de red " ," MITRE ATT&CK"," IoC"],

        url: "https://lnkd.in/p/dtNA8fmj",

        image: "/2.png"
    },


    {
        id: 2,

        title: "PhantomRing - HackTheBox",

        category: "CiberSeguridad ",

        description:
            "Resolución de una máquina de Hack The Box, aplicando técnicas de enumeración, análisis y explotación para comprometer el objetivo y completar el desafío de seguridad.",

        technologies:
            ["Enumeración", "Hack The Box", "Pentesting"," Explotación"],

        url: "https://lnkd.in/p/dbTe9UzS",

        image: "3.pnp"
    },


    {
        id: 3,

        title: "PsExec Hunt Lab - CyberDefenders",

        category: "Ciberseguridad",

        description:
            "Análisis de tráfico de red a partir de archivos PCAP utilizando Wireshark para identificar movimiento lateral, compromiso de endpoints, credenciales y actividad administrativa. El análisis permite investigar diferentes indicadores asociados al uso de PsExec y mapear las técnicas observadas con MITRE ATT&CK.",

        technologies:
            ["Wireshark", "PCAP", "Análisis de tráfico de red" ," PsExec" , " MITRE ATT&CK" ," Movimiento lateral"],

        url: "https://lnkd.in/p/dqvz23Ei",

        image: "4.png"
    },


    {
        id: 1,

        title: "XLMRat Lab - CyberDefenders",

        category: "CiberSeguridad",

        description:
            "Análisis de tráfico de red orientado a identificar técnicas de distribución de malware, scripts ofimáticos y técnicas de ataque relacionadas con MITRE ATT&CK, con especial atención a mecanismos de ejecución sigilosa y carga de código.",

        technologies:
            ["Wireshark", "Análisis de tráfico de red", " Malware Analysis" ," XLM" ," MITRE ATT&CK" ," PCAP"],

        url: "https://lnkd.in/p/duTwjkK9",

        image: "5.png"
    },


    {
        id: 5,

        title: "Meow Machine - HackTheBox",

        category: "CiberSeguridad",

        description:
            "Resolución de una máquina de Hack The Box mediante técnicas de enumeración y explotación orientadas a identificar y aprovechar los servicios disponibles en el objetivo.",

        technologies:
            ["Hack The Box ", "Pentesting"," Enumeración "," Explotación"],

        url: "https://lnkd.in/p/d8cSuDa2",

        image: "/6.png"
    },


    {
        id: 6,

        title: "Tomcat Takeover Lab - CyberDefenders",

        category: "CiberSeguridad",

        description:
            "Análisis de tráfico de red utilizando Wireshark, aplicando filtros y estadísticas para identificar servicios web, actividad administrativa y posibles indicadores de compromiso. El laboratorio está orientado a la investigación de un posible ataque contra un servidor Tomcat y al mapeo de las técnicas observadas con MITRE ATT&CK.",

        technologies:
            ["Wireshark", "Análisis de tráfico de red", "MITRE ATT&CK" ,"PCAP" ," Tomcat", " Web Security"],

        url: "https://lnkd.in/p/dnymgwyV",

        image: "/uno.png"
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
