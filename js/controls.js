(function() {

    // Load the YouTube iFrame API
    let tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let thePlayer;

    // This ready function will be called when the iFrame load is complete 
    // eslint-disable-next-line no-unused-vars
    function onYouTubeIframeAPIReady() {
        /* eslint-disable no-undef */
        thePlayer = new YT.Player('the-video', {
            videoId: overviewVideo,
        });
        /* eslint-enable no-undef */
    }

    jQuery(document).ready(function() {

        jQuery('.list-group-item').click(function(evt) {
            thePlayer.stopVideo();
            jQuery('.list-group-item').removeClass('active');

            const $elt = jQuery(evt.currentTarget);
            $elt.addClass('active');

            let videoId = $elt.data('video');
            if (videoId) {
                thePlayer.loadVideoById(videoId, $elt.data('start'));
            }
        });

        jQuery('.nav-link').click(function(evt) {
            thePlayer.stopVideo();
            jQuery('.list-group-item').removeClass('active');

            // If the nav-link specifies a video, use that video
            const $elt = jQuery(evt.currentTarget);

            let videoId = $elt.data('video');
            if (videoId) {
                thePlayer.cueVideoById(videoId, 0);
            } else {
                // Grab the first listed video and cue it up
                let $list;
                let ref = $elt.attr('href');
                if ($elt.hasClass('primary')) {
                    // Get the video list in the active secondary nav
                    let $nav = jQuery(ref).find('.nav-link.secondary.active');
                    $list = jQuery($nav.attr('href'));
                } else {
                    // Get the video list (this is the active secondary nav!)
                    $list = jQuery(ref);
                }

                const $item = $list.find('.list-group-item').first();
                if ($item.length) {
                    $item.addClass('active');
                    let videoId = $item.data('video');
                    if (videoId) {
                        // Use cue here rather than seek to show but not play
                        thePlayer.cueVideoById(videoId, $elt.data('start'));
                    }
                }
            }
        });
    });
});
