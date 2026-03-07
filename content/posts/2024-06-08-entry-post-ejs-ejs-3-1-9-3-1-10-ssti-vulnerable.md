---
title: "[EJS] EJS 3.1.9(3.1.10) SSTI vulnerable 연구"
date: "2024-06-08T11:51:06.000Z"
category: "Hacking/Web"
tags:
  - "ejs"
  - "ejs3.1.9"
  - "ejs3.1.9취약점"
  - "ejs취약점"
  - "웹해킹"
coverImage: "https://blog.kakaocdn.net/dn/N1QLL/btsHR9nuqgT/Jp9kITbHRKWS3Ogk99Kv8K/img.png"
excerpt: "이 글을 보고 있다면, NODEJS 3.1.6이전버전에서 발생하는 SSTI취약점에 대해서는 한번쯤 들어봤을 것이라고 생각한다. 제보된 해당 취약점 자체는 3.1.6 버전을 지나서 패치가 진행되었지만( EJS 3.1.7 이후 부터 outputFunctionName 이 패치되었다 ) 아직도 userInput을 검증없이 ren"
---

</p>
<p> </p>
<p>이 글을 보고 있다면, NODEJS 3.1.6이전버전에서 발생하는 SSTI취약점에 대해서는 한번쯤 들어봤을 것이라고 생각한다.</p>
<p> </p>
<p> </p>
<p>제보된 해당 취약점 자체는 3.1.6 버전을 지나서 패치가 진행되었지만( EJS 3.1.7 이후 부터 outputFunctionName 이 패치되었다 )</p>
<p>아직도 userInput을 검증없이 renderer에 넘겨준다면, 비슷한 렌더링 취약점은 똑같이 발생할 수 있다.</p>
<p> </p>
<p>대표적인 예로 escapeFuncton이 있는데, 해당 함수는 페이지에 동적으로 로딩되는 변수가 있을경우, returnValue를 가져오는 역할을 해주는 함수이다. 해당함수는 추후 curl이나 wget등이 막혀있는 case에서도 infoLeak을 비교적 수월하게 진행하도록 해준다.</p>
<p> </p>
<p>(실제로 exploit을 진행하다보면, shell을 획득해도, curl이나, wget이 삭제되어있어 flag, info를 탈취하는데 어려움을 겪는 문제가 꽤 있는데, 이를 이용하면 비교적 쉽게 탈취가 가능하다.)</p>
<p> </p>
<p>해당함수를 살펴보면 구조가 다음과 같음을 확일할 수 있다.</p>
<p><figure><img src="https://blog.kakaocdn.net/dn/cb3ApS/btsHTjvCqjC/PRmNDHqlAI0UbDRuErFUG0/img.png"/ /></figure>
</p>
<p>(escapeFn == escapeFunction)</p>
<p> </p>
<p>escapeFunction의 역할은 ejs에서 escape되는 문자열을 랜더링 할때 ex : &lt;%= "string" %&gt; string이 escape되기 위해 실행 되는 함수이다. 따라서 우리가 escapeFunction을 덮어준다면, &lt;%= "ex" %&gt; 로 렌더링 되는 모든 문자열을 덮을수 있다는 의미이고, 이는 곧 infoLeak이 아주 쉽게 가능해짐을 알 수 있다.</p>
<p> </p>
<p><figure><img src="https://blog.kakaocdn.net/dn/deiclC/btsHR7XsY2B/REkukNiljsFvHgKN2YC3b0/img.png"/ /></figure>
</p>
<p> </p>
<p>이를 사용하려면 조건이 필요한데, opts의 client를 1로 맞춰주어야 정상적으로 escapeFunction이 덮힌다.</p>
<p> </p>
<p>해당 취약점은 EJS 3.1.10에서도 패치되지 않았다.</p>
<p> </p>
<p>PoC는 그냥 위애꺼 보고 슥슥짜면 된다.</p>
<p> </p>
<p> </p>
<p> </p>
