
jQuery(document).ready(function() {

    jQuery('.list-group-item').click(function(evt) {
        const $elt = jQuery(evt.currentTarget);

        jQuery('.list-group-item').removeClass('active');
        $elt.addClass('active');

        let currentTarget = $elt.data('target');
        let currentStart = $elt.data('start');

        if (!jQuery('#' + currentTarget).is(':visible')) {
            if (videos[currentTarget].player) {
                videos[currentTarget].player.stopVideo();
            }
            jQuery('.' + videos[currentTarget].group).hide();
            jQuery('#' + currentTarget).show();
        }

        if ('player' in videos[currentTarget]) {
            console.log('reusing player');
            currentPlayer = videos[currentTarget].player;
            currentPlayer.seekTo(currentStart);
        } else {
            console.log('new player');
            currentPlayer = new YT.Player(
                currentTarget,
                {
                    videoId: videos[currentTarget].youtube,
                    events: {
                        'onReady': function() {
                            currentPlayer.seekTo(currentStart);
                            videos[currentTarget].player = currentPlayer;
                        }
                    }
                });
        }
    });

    jQuery('.nav-link').click(function(evt) {
        // Grab the first video and display it
        const selector = jQuery(evt.currentTarget).attr('href');
        const $item = jQuery(selector).find('.list-group-item').first();
        if ($item.length) {
            $item.addClass('active');
            currentTarget = $item.data('target');

            if ('player' in videos[currentTarget]) {
                console.log('reusing player');
                currentPlayer = videos[currentTarget].player;
                currentPlayer.seekTo(currentStart);
                jQuery('#' + currentTarget).show();
            } else {
                currentPlayer = new YT.Player(
                    currentTarget,
                    {
                        videoId: videos[currentTarget].youtube,
                        'onReady': function() {
                            currentPlayer.seekTo(currentStart);
                            videos[currentTarget].player = currentPlayer;
                            jQuery('#' + currentTarget).show();
                        }
                    });
            }
        }
    });
});
