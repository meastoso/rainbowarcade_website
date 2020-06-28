/*
Members and projects are dynamically generated from javascript here
 */
$( document ).ready(function() {
    initializeMembers();
    initializeProjects();
});

function initializeMembers() {
    $.getJSON("/ra-admin/members.json", function(response) {
        const membersArr = response["members"];
        // sort by priority
        const sortedMembers = sortItems(membersArr);
        let memberIndex = 0;
        let newRow = $(getNewMemberRow());
        while (memberIndex < sortedMembers.length) {
            const member = sortedMembers[memberIndex];
            newRow.append(getMemberHTML(member))
            memberIndex++;
            if (memberIndex % 4 === 0) {
                $("#team").append(newRow);
                newRow = $(getNewMemberRow());
            }
        }
        if (membersArr % 4 !== 0) {
            // we have a number of members not divisible by 4
            // need to append the final row
            $("#team").append(newRow);
        }
        // re-initialize row fadeUp animations
        $("#team > .row").themePluginAnimate();
        // re-initialize lazyload for dynamic member images
        $("#team img").lazyload();
    });
}

function initializeProjects() {
    $.getJSON("/ra-admin/projects.json", function(response) {
        const projectsArr = response["projects"];
        // sort by priority
        const sortedProjects = sortItems(projectsArr);
        const carousel = $('<div id="projectsCarousel" class="owl-carousel owl-theme stage-margin"></div>');
        sortedProjects.forEach(project => {
            carousel.append(getProjectHTML(project));
        });
        $("#projectsCarouselWrapper").append(carousel);
        $("#projectsCarousel").owlCarousel({
            items: 4,
            margin: 10,
            loop: false,
            nav: true,
            dots: true,
            stagePadding: 40
        });
    });
}

function getProjectHTML(projectObj) {
    var projectType = projectObj["type"] && projectObj["type"].toUpperCase();
    return '<div>' +
        '<div class="portfolio-item">' +
        '<a href="' + projectObj["project-url"] + '" target="_blank">' +
        '<span class="thumb-info thumb-info-lighten thumb-info-no-borders">' +
        '<span class="thumb-info-wrapper border-radius-0">' +
        '<img src="/ra-admin/projects-assets/' + projectObj["image"] + '" class="img-fluid" alt="">' +
        '<span class="thumb-info-title">' +
        '<span class="thumb-info-inner">' + projectObj["title"] + '</span>' +
        '<span class="thumb-info-type project-type-video">' + projectType + '</span>' +
        '</span>' +
        '<span class="thumb-info-action">' +
        '<span class="thumb-info-action-icon bg-dark opacity-8"><i class="fas fa-plus"></i></span>' +
        '</span>' +
        '</span>' +
        '</span>' +
        '</a>' +
        '</div>' +
        '</div>'
}

function getNewMemberRow() {
    return '<div class="row pb-5 mb-5 appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200"></div>'
}

function getMemberHTML(member) {
    const initialHTML = '<div class="col-sm-6 col-lg-3 mb-4 mb-lg-0">' +
    '<span class="thumb-info thumb-info-hide-wrapper-bg">' +
    '<span class="thumb-info-wrapper">' +
    '<img class="img-fluid border-radius-0"' +
    ' src="img/lazy.png"' +
    ' data-plugin-lazyload=""' +
    ' data-plugin-options="{\'effect\' : \'fadeIn\'}"' +
    ' data-original="/ra-admin/member-assets/KEY.IMAGE"' +
    ' width="255"' +
    ' height="255" alt="" />' +
    'KEY.TITLE' +
    '</span>' +
    '<span class="thumb-info-caption">' +
    '<h3 class="font-weight-bold text-color-dark text-4 line-height-1 mt-3 mb-0">KEY.NAME</h3>' +
    '<span class="text-2 mb-0">KEY.TYPE</span>' +
    '<span class="thumb-info-caption-text pt-1">KEY.DESCRIPTION</span>' +
    '<span class="thumb-info-social-icons">' +
    'KEY.TWITCH' +
    'KEY.TWITTER' +
    'KEY.INSTAGRAM' +
    'KEY.YOUTUBE' +
    'KEY.WEBSITE' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</div>'
    let memberHTML = initialHTML
        .replace('KEY.NAME', member.name && member.name.toUpperCase())
        .replace('KEY.TYPE', member.type && member.type.toUpperCase())
        .replace('KEY.IMAGE', member.image)
        .replace('KEY.DESCRIPTION', member.description)

    if (member.title && member.title !== "") {
        memberHTML = memberHTML.replace('KEY.TITLE', '<span class="thumb-info-title"><span class="thumb-info-inner">' + member.title + '</span></span>')
    } else memberHTML = memberHTML.replace('KEY.TITLE', '');
    if (member.twitch && member.twitch !== "") {
        memberHTML = memberHTML.replace('KEY.TWITCH', '<a class="ra-social-link ra-twitch" target="_blank" href="http://twitch.com/' + member.twitch + '"><i class="fab fa-twitch"></i><span>Twitch</span></a>')
    } else memberHTML = memberHTML.replace('KEY.TWITCH', '');
    if (member.twitter && member.twitter !== "") {
        memberHTML = memberHTML.replace('KEY.TWITTER', '<a class="ra-social-link ra-twitter" target="_blank" href="http://www.twitter.com/' + member.twitter + '"><i class="fab fa-twitter"></i><span>Twitter</span></a>')
    } else memberHTML = memberHTML.replace('KEY.TWITTER', '');
    if (member.instagram && member.instagram !== "") {
        memberHTML = memberHTML.replace('KEY.INSTAGRAM', '<a class="ra-social-link ra-instagram" target="_blank" href="http://instagram.com/' + member.instagram + '"><i class="fab fa-instagram"></i><span>Instagram</span></a>')
    } else memberHTML = memberHTML.replace('KEY.INSTAGRAM', '');
    if (member.youtube && member.youtube !== "") {
        memberHTML = memberHTML.replace('KEY.YOUTUBE', '<a class="ra-social-link ra-youtube" target="_blank" href="http://youtube.com/' + member.youtube + '"><i class="fab fa-youtube"></i><span>YouTube</span></a>')
    } else memberHTML = memberHTML.replace('KEY.YOUTUBE', '');
    if (member.website && member.website !== "") {
        memberHTML = memberHTML.replace('KEY.WEBSITE', '<a class="ra-social-link ra-website" target="_blank" href="' + member.website + '"><i class="fas fa-globe"></i><span>Website</span></a>')
    } else memberHTML = memberHTML.replace('KEY.WEBSITE', '');
    return memberHTML;
}

function sortItems(items) {
    return shuffle(items).sort((a, b) => (a.priority > b.priority) ? -1 : 1)
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}