---
title: "CCE 2024 Junior 예선 Web Write Up"
date: "2024-08-22T13:37:33.000Z"
category: "CTF"
tags: []
coverImage: "https://blog.kakaocdn.net/dn/c4UUDe/btsJb3GriC7/fstukTSzwUgjBhlNDQLZMk/img.png"
excerpt: "운이 좋게도, 예선에서 3등을 할 수 있었다. 팀원들도 잘해줘서 좋았다. 다른 분들이 푼 라업까지 올리긴 좀 그래서 내가 푼것만 올려본다. Infomation leak 취약점 개요 블랙박스 문제였다. 거의 4시간동안 잡고 있었다 ㅠ 접속해보면 microsoft피싱사이트가 나온다. save.php를 이용해서 id와 pw정보"
---

<p>운이 좋게도, 예선에서 3등을 할 수 있었다. </p>
<p>팀원들도 잘해줘서 좋았다.</p>
<p>다른 분들이 푼 라업까지 올리긴 좀 그래서 내가 푼것만 올려본다.</p>
<h2>Infomation leak</h2>
<p><b>취약점 개요</b></p>
<p>블랙박스 문제였다. 거의 4시간동안 잡고 있었다 ㅠ</p>
<p>접속해보면 microsoft피싱사이트가 나온다. save.php를 이용해서 id와 pw정보를 저장하는 것을 알 수 있다.</p>
<p> </p>
<p>save.php를 보았을때 서버는 php로 작동하는 것을 알 수 있다. 따라서 블랙박스 단골 엔드포인트 download.php, admin.php, upload.php등을 넣어봤더니 실제로 존재하는 것을 알 수 있었다.</p>
<p> </p>
<p>그 중 필자는 upload.php에 집중했다. body없이 upload.php에 post요청을 보내주면, 오류를 확인할 수 있는데 이를 통해서 file파라미터가 필요함을 알 수 있었다.</p>
<p> </p>
<p>또한, 파일이 업로드된 경로는 헤더를 통해서 알려주고 있었다.</p>
<p>업로드에서는 php등의 파일 타입은 업로드하지 못하게 막혀있었는데, 확장자 그 자체는 검증을 하지 않고 있다는 것을 알았다. 따라서, 사진의 데이터 부분에 웹셀을 삽입하여, 랜더링시 php로 컴파일 되게끔 유도하였고, 실제로 잘 작동하는 것을 알 수 있었다.</p>
<p> </p>
<p>아쉽게도 내가 획득한 쉘에는 읽기 권한이 없었지만, php자체에서 <code>file_get_contents</code> 함수를 사용하니, 읽기가 가능하였다.</p>
<p> </p>
<p>그렇게 /secret.txt파일을 읽었더니, redis쉘로 가라고 해서, redis-cli 를 통해 로컬로 접속하려고 시도했지만, redis-server는 서버에 설치가 되지 않은 상태였고, 내부망에 redis-server가 설치된 컴퓨터가 있을것이라고 생각, php의 env를 읽어보았더니, 172.40.0.10이 redis 서버 주소임을 알려주고 있었다.</p>
<p> </p>
<p>그렇게 접속해서 PING을 날려보았더니 PONG이 왔고 환호성을 지르고 keys *를 입력하니, flag는 없고, id와 pw만 남아 있는 것을 확인할 수 있었다.</p>
<p> </p>
<p>무엇일까 계속 고민하다가, INFO명령어를 통해 redis 버전을 확인한 결과 5.X대로 상당히 구버전임을 알 수 있었다. 실제로 깃허브에서 익스플로잇을 검색하니 어렵지 않게 찾을 수 있었다 ㅠ</p>
<p> </p>
<p>find명령을 이용해 flag.txt를 검색해본 결과, /data/flag.txt 경로에 있다는 것을 알게 되었고,</p>
<p><figure><img src="https://blog.kakaocdn.net/dn/c4UUDe/btsJb3GriC7/fstukTSzwUgjBhlNDQLZMk/img.png"/ /></figure>
</p>
<p><code>redis-cli -h 172.40.0.10 eval 'local io_l = package.loadlib("/usr/lib/x86_64-linux-gnu/liblua5.1.so.0", "luaopen_io"); local io = io_l(); local f = io.popen("cat /data/flag.txt", "r"); local res = f:read("*a"); f:close(); return res' 0</code></p>
<p> </p>
<p><b>CCE2024{b93965fdf8d82e3c5536e2f492a255a3}</b></p>
<h2>time travel</h2>
<p>힌드를 누르니 코드를 주고 있었다. 코드 분석을 해보았더니,</p>
<p><code>mb_strcut</code> 함수를 사용하여 <code>passcord</code>의 첫 3바이트만 잘라냄. 따라서 비밀번호는 UTF-8로 3바이트일 가능성이 크다.</p>
<p> </p>
<p>비밀번호는 다음 조건을 만족해야 했었다.</p>
<ol>
<li><b>UTF-8 인코딩의 첫 3바이트</b>.</li>
<li><code>ISO-2022-CN-EXT</code>로 변환한 후 16진수 문자열의 길이가 8자 이상이어야 함.</li>
<li>변환된 16진수 문자열의 네 번째 바이트 값이 <code>0x48</code>에서 <code>0x4C</code> 사이여야 함.</li>
</ol>
<p>또한 인코딩을 보아, 중국어가 아니면 오류가 날것으로 생각했고, 실제로 중국어로 브루트포싱해서 답을 구할 수 있었다</p>
<pre><code>&lt;?php

    function safe_iconv($in_charset, $out_charset, $str)
    {
        $result = @iconv($in_charset, $out_charset, $str);

        if ($result === false) {
            throw new Exception("iconv conversion failed: Detected an illegal character in input string");
        }
        return $result;
    }

$passcord = "份";
$passcord = mb_strcut($passcord, 0, 3, 'UTF-8');

 try {
        $passcord = safe_iconv("UTF-8", "ISO-2022-CN-EXT", $passcord);
        echo "STEP_1 Passed\n";
    } catch (Exception $e) {
        echo "redirected";
        exit();
    } finally {
        $passcord = iconv("UTF-8", "ISO-2022-CN-EXT", $passcord);
        $passcord_hex = bin2hex($passcord);
        error_log("Passcord: " . $passcord_hex);
        if (strlen($passcord_hex) &gt;= 8) {
            echo "STEP_2 Passed\n";
            $fourth_byte_hex = substr($passcord_hex, 6, 2);
            $fourth_byte_value = hexdec($fourth_byte_hex);

            if ($fourth_byte_value &gt;= 0x48 &amp;&amp; $fourth_byte_value &lt;= 0x4C) {
                echo "redirected";
                exit();
            } else {
                echo "STEP_3 Passed\n";
                error_log("OK");
            }
        } else {

            echo "redirected";
            exit();
        }

    }

echo "$passcord";

?&gt;</code></pre>
<p> </p>
<p>실제로 로컬에서 계속 돌리니 <code>份</code> 를 입력하면 정답으로 인식되는것을 확인했다.</p>
<p><b>cce2024{d82e4e7f1882be6a45b603ad2a552e513f680d2c25547aa3cdcd80f0edbabd4f}</b></p>
<h2>internal inspection</h2>
<p>해당 문제는 처음 열었을때 코드가 정말 간결하고, 문제가 없다고 생각했다,</p>
<p> </p>
<p>하지만 사용하고 있는 라이브러리에서 취약점이 발생할 수 있다는 것을 알았다.</p>
<p> </p>
<p><code>from lxml import etree</code> lxml라이브러리가 실제로 취약했었다.</p>
<p> </p>
<p>해당 라이브러리는 xxe취약점이 발생할 수 있다고 한다.</p>
<p> </p>
<p><a href="https://docs.prismacloud.io/en/enterprise-edition/policy-reference/sast-policies/python-policies/sast-policy-50">https://docs.prismacloud.io/en/enterprise-edition/policy-reference/sast-policies/python-policies/sast-policy-50</a></p>
<p>하지만 문제가 있었다. 바로 SYSTEM 문자열을 소문자로 치완해버리는 것이였는데,</p>
<p>eval를 이용해서 잘 해결했다.</p>
<p> </p>
<p><figure><img src="https://blog.kakaocdn.net/dn/zK2PA/btsJb21MFgg/4AOPD28NKr9tXLNvHUUedK/img.png"/ /></figure>
</p>
<p> </p>
<p>이런형태의 파일을 파싱하게 만들었더니, 필터링 없이 잘 넘어갔고, 플래그가 포함된 파일을 획득할 수 있었다,</p>
<p> </p>
<p><figure><img src="https://blog.kakaocdn.net/dn/csvuK0/btsJcN3ZgJJ/O1GzTzv3xIz1Xt6bfa5rK0/img.png"/ /></figure>
</p>
<p> </p>
<h2>한줄평</h2>
<p>솔직히 웹 문제들이 그렇게 어렵진 않았다. 다 못푼게 후회된다. </p>
<p>웹 1등으로 푼 분 보다 1문제를 못 풀었는데 분발해야겠다.</p>
<p> </p>
<p>본선가서 상따고 싶다. </p>
<p>제발.</p>
