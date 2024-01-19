
var isLocal = window.location.origin.startsWith('file')
window.log = isLocal

function print(...args) {
    if (window.log) {
        console.log(...args)
    }
}

async function sendAnalyticsData() {
    try {
        const userAgent = navigator.userAgent;

        const resIp = await (await fetch('https://www.cloudflare.com/cdn-cgi/trace')).text();
        let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
        let ip = resIp.match(ipRegex)[0];
        print('ip', ip)
        const url = 'http://www.geoplugin.net/json.gp?ip=' + ip;
        const loc = await (await fetch(url)).json();
        print('resLoc', loc)

        // Screen Resolution and Browser Window Size
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        const browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // Create an object containing the information
        const clientInfo = {
            userAgent: userAgent,
            location: {
                country: loc.geoplugin_countryName,
                city: loc.geoplugin_city,
                state: loc.geoplugin_region
            },
            screenResolution: {
                screenWidth: screenWidth,
                screenHeight: screenHeight
            },
            browserWindowSize: {
                browserWidth: browserWidth,
                browserHeight: browserHeight
            }
        };
        print(clientInfo)
        logActivity('view', clientInfo)
    } catch (error) {
        console.error(error)
        logActivity('error', error)
    }
}

function logActivity(name, data) {
    if (!isLocal) {
        let formData = new FormData();
        formData.append('entry.1958190792', name);
        formData.append('entry.1860107021', JSON.stringify(data));

        fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSctsZke6pcEj3OP6Ptx0WJQoaU70rOra6r6cm8QCzsL40wjTA/formResponse?pli=1", {
            body: formData,
            method: "post",
            mode: 'no-cors'
        }).then(res => {
            print(res)
        }).catch(error => {
            logActivity('error', error)
        });
    } else {
        print('⚫️ activity:', name, JSON.stringify(data))
    }
}

function showUpdateButton() {
    document.getElementById('btn_update').style.display = 'block'
}

window.addEventListener('load', function () {
    console.log(`showUpdateButton()`)
    if (!isLocal) {
        document.getElementById('btn_update').style.display = 'none'
    }

    sendAnalyticsData().then();

    let scrollActivitySendTask = 0

    window.addEventListener("scroll", function () {
        const scrollTop = window.scrollY || window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        clearTimeout(scrollActivitySendTask)
        scrollActivitySendTask = setTimeout(() => {
            logActivity('scroll', parseInt(scrollPercentage))
        }, 1000)
    }, false);
});

