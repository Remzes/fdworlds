<div class="sidebar" style="width: 240px;">
    <div class="mon">
        <span class="col-a" style="font-size: 14px;"><b>❤ Мониторинг</b></span><br />
        <i><span class="col-b">IP:</span> <span class="col-e">fdworlds.com</span></i>
        <?php
        $json_data = json_decode( file_get_contents( $_SERVER['DOCUMENT_ROOT']."/fetmonitoring/monitoring.json" ), 1 );
        $str = '';

        if( $_SERVER['REMOTE_ADDR'] === "213.137.244.5" ) {//debug for dev
            //var_dump($json_data);
        }
        //<i class="fa fa-unlock" aria-hidden="true"></i>
        foreach ($json_data as $key => $value) {

            if( $key !== "comStats" ) {

                if( $value[4] === 'requirelauncher' ) {
                    $str .=
                        '<div alt="'.$key.'" class="server-banner prompt-server" data-title="Вход на сервер только через наш лаунчер">
									<div class="stats-server-name">'.$key.'</div>
									<div class="stats-server-amount">'.$value[1].'/'.$value[2].'</div>
									<div class="prompt-server stats-server-status">
										<i class="fa fa-lock" style="font-size: 1.6em; color: #db2f13;" aria-hidden="true"></i>
									</div>
								</div>';
                } else {
                    $str .=
                        '<div alt="'.$key.'" class="server-banner prompt-server" data-title="Вход на сервер свободный">
									<div class="stats-server-name">'.$key.'</div>
									<div class="stats-server-amount">'.$value[1].'/'.$value[2].'</div>
									<div class="stats-server-status">
										<i class="fa fa-unlock" style="font-size: 1.6em; color: green;" aria-hidden="true"></i>
									</div>
								</div>';
                }

            }

        }

        echo $str;
        ?>
    </div>
    <div class="vote">
        <span class="col-6">❤ Голосование</span>
        <!--<div id="vk_like"></div>-->
        <div class="vote-banners" style="padding: 4px;">
            <a alt="Голосуй за нас в ТОПе" href="http://monitoringminecraft.ru/top/fdworlds"><img src="http://monitoringminecraft.ru/top/fdworlds/widget1.png" /></a>
            <a href="http://mcrate.su/rate/6806" target="_blank"><img src="http://mcrate.su/bmini.png"></a>
            <a href="https://fairtop.in/project/994" target="_blank"><img src="../templates/theme/images/fairtop_logo.png" style="width: 88px;"></a>
            <a href="http://www.minecraftforum.net/servers/10928-fantasy-dream-worlds/vote" target="_blank"><img src="../templates/theme/images/mcforum.png" style="width: 88px;"></a>
            <a href="http://ftbservers.com/server/GghfqU9c/vote" target="_blank"><img src="../templates/theme/images/ftbservers.png" style="width: 180px;"></a>
        </div>
        <span class="col-e">Топ голосующих</span>
        <table width="94%" border="0" cellpadding="3" cellspacing="0">
            <?PHP
            $result = $dev->load_from_db("SELECT
                                    playername,all_points
                                FROM
                                    pp_playerpoints
                                ORDER BY
                                    all_points DESC
                                LIMIT 5");

            $str = '';
            $counter = 0;
            foreach($result as $key => $value){
                if( $counter === 0 ) {
                    $str .= '<tr class="col-b"><td style="background-image:url(/lk/preview/skin.php?username='.$value['playername'].')">'.$value['playername'].'</td><td width="35" align="right">'.$value['all_points'].'</td></tr>';
                } elseif ( $counter === 1 ) {
                    $str .= '<tr class="col-6"><td style="background-image:url(/lk/preview/skin.php?username='.$value['playername'].')">'.$value['playername'].'</td><td width="35" align="right">'.$value['all_points'].'</td></tr>';
                } elseif( $counter === 2 ) {
                    $str .= '<tr class="col-e"><td style="background-image:url(/lk/preview/skin.php?username='.$value['playername'].')">'.$value['playername'].'</td><td width="35" align="right">'.$value['all_points'].'</td></tr>';
                } else {
                    $str .= '<tr><td style="background-image:url(/lk/preview/skin.php?username='.$value['playername'].')">'.$value['playername'].'</td><td width="35" align="right">'.$value['all_points'].'</td></tr>';
                }
                $counter++;
            }
            echo $str;
            ?>
        </table>		</div>
    <div id="mcrate" style="display:none">
        <div align="center">
            <span class="col-7">MCRate.su</span><br />
            <span class="col-6">Голосуй и получай бонусы!</span>
            <br /><br />
            <img src="/img/mcr.png" alt="Бонусы MCRate" />
        </div>
        <ol><li>Авторизуйся через ВК</li>
            <li>Впиши свой ник</li>
            <li>Нажми "Проголосовать"</li></ol>
        <span class="col-e">Забрать бонусы можно через</span> <span class="col-c">/menu</span>
    </div>
    <div id="want2vote" style="display:none">
        <div align="center">
            <span class="col-7">Want2Vote.com</span><br />
        </div>
        <ol><li>Войди через ВКонтакте</li>
            <li>Впиши свой ник</li>
            <li>Нажми "Проголосовать"</li></ol>
    </div>
    <div id="topcraft" style="display:none">
        <div align="center">
            <span class="col-7">TopCraft.ru</span><br />
            <span class="col-6">Голосуй и получай бонусы!</span>
            <br /><br />
            <img src="/img/tc.png" alt="Бонусы TopCraft" />
        </div>
        <ol><li>Впиши свой ник</li>
            <li>Нажми "Голосовать!"</li>
            <li>Войди через ВКонтакте</li></ol>
        <span class="col-e">Забрать бонусы можно через</span> <span class="col-c">/menu</span>
    </div>
    <div id="fairtop" style="display:none">
        <div align="center">
            <span class="col-7">FairTop.in</span><br />
        </div>
        <ol><li>Впиши свой ник</li>
            <li>Нажми "Проголосовать!"</li>
            <li>Войди через ВКонтакте</li></ol>
    </div>
    <div id="ts3viewer_1092247" style="height: 30%;"> </div>
    <!--<iframe src="https://discordapp.com/widget?id=267858644933017602&theme=dark" width="240" height="400" allowtransparency="true" frameborder="0"></iframe>-->
    <!--<a href="https://www.tsviewer.com/index.php?page=ts_viewer&ID=1092247"><img src="https://www.tsviewer.com/promotion/dynamic_sig/sig.php/clan160x283_l4d/1092247.png"></a>-->
</div>