var site = document.getElementById('site');

function buildLink(url, text) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
}
var github = buildLink('https://github.com/seanmcp', 'GitHub');
var linkedin = buildLink('https://linkedin.com/in/seanmcp', 'LinkedIn');
var email = buildLink('mailto:sean@seanmcp.com', 'sean@seanmcp.com');

var yesIAm = 'Yeah!';
var noIAmNot = 'Nope.';

function buildList(list, andOr) {
    var output = ''
    list.forEach(function(item, index) {
        output += `<strong>${item}</strong>`;
        if (index !== list.length - 1) {
            output += ', ';
        }
        if (index === list.length - 2) {
            output += `${andOr} `;
        }
    });
    return output;
}

function buildHeader() {
    var heading = document.createElement('h1');
    if (amILookingForWork) {
        heading.textContent = yesIAm;
    } else {
        heading.textContent = noIAmNot
    }
    site.appendChild(heading);
}

function buildContent() {
    if (amILookingForWork) {
        buildYesContent();
    } else {
        var p = document.createElement('p');
        p.innerHTML = `Thank you for reaching out, but I am happy in my current position. Feel free to connect with me on ${linkedin} and check back later.`;
        site.appendChild(p);
    }
}

function buildYesContent() {
    var p = document.createElement('p');
    p.innerHTML = `I'm interested in building applications that <strong>help people help people</strong>. I'm motivated by projects that solve problems that make the world a better place. Does that match the <strong>mission statement</strong> of the company you have in mind?`
    site.appendChild(p);

    var prompt = document.createElement('section');
    prompt.classList.add('prompt');

    var yesButton = document.createElement('button');
    yesButton.type = 'button';
    var yesMessage = 'You bet!';
    yesButton.textContent = yesMessage;
    yesButton.addEventListener('click', function() {
        replacePrompt(prompt, yesMessage);
        buildMissionMatchContent();
    });
    prompt.appendChild(yesButton);

    var noButton = document.createElement('button');
    noButton.type = 'button';
    var noMessage = 'Not quite'
    noButton.textContent = noMessage;
    noButton.addEventListener('click', function() {
        replacePrompt(prompt, noMessage);
        builtNoMatchContent();
    });
    prompt.appendChild(noButton);

    site.appendChild(prompt);
}

function buildMissionMatchContent() {
    var p = document.createElement('p');
    var pContent = `Awesome! I\'m looking for work as a ${buildList(titles, 'or')} working with ${buildList(technologies, 'and')}.`;
    p.innerHTML = pContent;
    site.appendChild(p);

    var p2 = document.createElement('p');
    p2.textContent = 'Living and working near family is important to me. I\'m interested in positions in the following cities (ordered by preference):';
    site.appendChild(p2);

    var list = document.createElement('ol');
    locations.forEach(function(location) {
        var item = document.createElement('li');
        item.innerHTML = `<strong>${location}</strong>`;
        list.appendChild(item);
    });
    site.appendChild(list);

    var p3 = document.createElement('p');
    p3.textContent = 'Does all that match the position you have in mind?';
    site.appendChild(p3);

    var prompt = document.createElement('section');
    prompt.classList.add('prompt');

    var yesButton = document.createElement('button');
    yesButton.type = 'button';
    var yesMessage = 'Yep!';
    yesButton.textContent = yesMessage;
    yesButton.addEventListener('click', function() {
        replacePrompt(prompt, yesMessage);
        buildPositionMatchContent();
    });
    prompt.appendChild(yesButton);

    var noButton = document.createElement('button');
    noButton.type = 'button';
    var noMessage = 'Not really'
    noButton.textContent = noMessage;
    noButton.addEventListener('click', function() {
        replacePrompt(prompt, noMessage);
        builtNoMatchContent();
    });
    prompt.appendChild(noButton);

    site.appendChild(prompt);
}

function buildPositionMatchContent() {
    var p = document.createElement('p');
    p.innerHTML = `Alright! I'm looking forward to hearing more about the company and position. Please <strong>send me an email</strong> with the details: ${email}.`
    site.appendChild(p);

    var p2 = document.createElement('p');
    p2.innerHTML = `In the meantime, you can view my ${buildLink('https://github.com/seanmcp/resume', 'digital resume online')}<a href="#hardcopy" class="cite">*</a>, projects on ${github}, and work history on ${linkedin}.`
    site.appendChild(p2);   

    var heading = document.createElement('h2');
    heading.textContent = `Talk to you soon!`
    site.appendChild(heading);

    var p3 = document.createElement('p');
    p3.id = "hardcopy";
    p3.classList.add('footnote');
    p3.innerHTML = `* If you <em>absolutely need</em> a physical copy of my resume, please request one by email.`;
    site.appendChild(p3);
}

function builtNoMatchContent() {
    var p = document.createElement('p');
    p.innerHTML = `Oh well. Thank you for reaching out. Feel free to connect with me on ${linkedin} and check back later.`;
    site.appendChild(p);
}

function replacePrompt(element, answer) {
    element.innerHTML = "";
    var quote = document.createElement('blockquote');
    quote.textContent = `“${answer}”`;
    element.appendChild(quote);
}

function buildMeta() {
    if (amILookingForWork) {
        document.title = yesIAm;
        buildFavicon('yes');
    } else {
        document.title = noIAmNot;
        buildFavicon('no');
    }
}

function buildFavicon(answer) {
    var favicon = document.createElement('link');
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/png';
    favicon.href = `./${answer}.png`;
    document.querySelector('head').appendChild(favicon);
}

function buildSite() {
    buildMeta();
    buildHeader();
    buildContent();
}

buildSite();