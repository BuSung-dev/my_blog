---
title: "[ Webhacking.kr ] Old-15 문제 풀이 (1번)"
date: "2023-12-20T12:36:03.000Z"
category: "WarGame/Webhacking.kr"
tags:
  - "wargame"
  - "webhacking.kr"
  - "webhaking"
  - "웹해킹"
  - "해킹"
coverImage: "https://blog.kakaocdn.net/dn/b44m5o/btsCj2VtH8W/akt9EOqquVvqklWdS9v4l0/img.png"
excerpt: "문제 Webhacking.kr | Old-15 문제를 처음 눌러보면, \"Access_Denied\" Alert창이 뜨는 것을 볼 수 있다. 이렇게 Alert창이 뜨며, 확인을 누를 시 창이 종료되는 것을 확인할 수 있다. 풀이 해당 문제는 매우 간단하게 풀이가 가능하다. 개발자 모드 -&gt; 설정 -&gt; JavaScr"
---

<h2>문제</h2>
<blockquote>Webhacking.kr | Old-15</blockquote>
<p> </p>
<p>문제를 처음 눌러보면,</p>
<p><figure><img src="https://blog.kakaocdn.net/dn/b44m5o/btsCj2VtH8W/akt9EOqquVvqklWdS9v4l0/img.png"/><figcaption>"Access_Denied" Alert창이 뜨는 것을 볼 수 있다.</figcaption>
</figure>
</p>
<p> </p>
<p>이렇게 Alert창이 뜨며, 확인을 누를 시 창이 종료되는 것을 확인할 수 있다.</p>
<p> </p>
<h2>풀이</h2>
<p>해당 문제는 매우 간단하게 풀이가 가능하다.</p>
<p><figure><img src="https://blog.kakaocdn.net/dn/ZjJdq/btsCj2nG3QE/A39lUfGwSEmxBRa4ehKnEK/img.png"/><figcaption>개발자 모드 -&gt; 설정 -&gt; JavaScript 사용안함 체크</figcaption>
</figure>
</p>
<p> </p>
<p>JavaScript 사용 안 함을 개발자 모드에서 체크 후 재접속해주면,</p>
<p> </p>
<p> </p>
<p><figure><img src="https://blog.kakaocdn.net/dn/cr7eY8/btsCoHbf19d/KcFC7OUTl8pHBJ3LkoXkF1/img.png"/ /></figure>
</p>
<p> </p>
<p>아무것도 뜨지 않는 모습을 볼 수 있는데, 이때 개발자 도구로 소스코드를 확인해 보면</p>
<p> </p>
<pre><code>&lt;script&gt;
  alert("Access_Denied");
  location.href='/';
  document.write("&lt;a href=?getFlag&gt;[Get Flag]&lt;/a&gt;");
&lt;/script&gt;</code></pre>
<p> </p>
<p>이러한 Script를 확인해 볼 수 있다.</p>
<p> </p>
<p>따라서, URL뒤에 getflag 파라미터를 추가하면, Flag가 추출될 것으로 예상해 볼 수 있다.</p>
<p>실제로 파라미터를 붙여서 확인해 보면, </p>
<p> </p>
<p><figure><img src="https://blog.kakaocdn.net/dn/bUUm0g/btsCpB2LFOu/vx7tOkGTEJVQnKucqeA8q1/img.png"/><figcaption>성공!</figcaption>
</figure>
</p>
<p> </p>
<p>문제가 풀린 것을 알 수 있다.</p>
<p> </p>
<p> </p>
