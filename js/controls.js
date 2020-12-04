var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var thePlayer;
function onYouTubeIframeAPIReady() {
    console.log('YouTubeIframeAPIReady');
    thePlayer = new YT.Player('the-video', {
        videoId: overviewVideo,
    });
}

function loadVideo(videoId, start) {
    
}

jQuery(document).ready(function() {

    jQuery('.list-group-item').click(function(evt) {
        thePlayer.stopVideo();
        jQuery('.list-group-item').removeClass('active');

        const $elt = jQuery(evt.currentTarget);
        $elt.addClass('active');

        let videoId = $elt.data('target')
        if (videoId) {
            thePlayer.loadVideoById(videoId, $elt.data('start'));
        }
    });

    jQuery('.nav-link').click(function(evt) {
        thePlayer.stopVideo();
        jQuery('.list-group-item').removeClass('active');

        // If the nav-link specifies a video, use that target & start
        const $elt = jQuery(evt.currentTarget);

        let videoId = $elt.data('target');
        if (videoId) {
            thePlayer.cueVideoById(videoId, 0);
        } else {
            // Grab the first listed video and cue it up
            let $list;
            let ref = $elt.attr('href');
            if ($elt.hasClass('primary')) {
                let $nav = jQuery(ref).find('.nav-link.secondary.active');
                $list = jQuery($nav.attr('href'));
            } else {
                $list = jQuery(ref);
            }
            const $item = $list.find('.list-group-item').first();

            if ($item.length) {
                $item.addClass('active');
                let videoId = $item.data('target');
                let start = $item.data('start');
                if (videoId) {
                    thePlayer.cueVideoById(videoId, $elt.data('start'));
                }
            }
        }
    });
});
