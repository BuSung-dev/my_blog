---
title: "[NEXTJS] Gemini Api 사용해서 AI 웹소설 사이트 만들기 - 1"
date: "2024-06-07T07:27:48.000Z"
category: "Develop"
tags:
  - "AI"
  - "AI소설"
  - "Gemini"
  - "geminiapi"
  - "구글gemini"
  - "아무글"
excerpt: "서론 며칠전 유튜브를 보다가 Gemini 1.5 Pro가 정식 출시된것을 보았다. 이미 Gemini 1.5 Pro를 얼리엑세스로 사용해본지라, 성능이 굉장히 막강함을 알고있었는데, (Gemini 1.0 Pro에 비해 자연어 처리가 비약적인 수준으로 발전하였다 특히 한국어) 무려 이 막강한 AI를 구글은 `무료로` 풀어주었"
---

<figure><img src="https://blog.kakaocdn.net/dn/70rte/btsHSr8wuC3/odM1uXCt0NBtQKdGTZW7n1/img.jpg"/ /></figure>
<p> </p><h2>서론</h2><p>며칠전 유튜브를 보다가 Gemini 1.5 Pro가 정식 출시된것을 보았다.<br />이미 Gemini 1.5 Pro를 얼리엑세스로 사용해본지라, 성능이 굉장히 막강함을 알고있었는데, (Gemini 1.0 Pro에 비해 자연어 처리가 비약적인 수준으로 발전하였다 특히 한국어)<br /> <br />무려 이 막강한 AI를 구글은 `무료로` 풀어주었다 (제한이 있긴하지만... 킹갓구글)<br /> <br />그래서 떠올린 것이, AI 소설사이트를 만드는 것이였는데,<br /> <br />재밌기도 하고 시간 때우기 용 서비스... 같은 개인적인 이유도 있었지만,<br />제일 큰 이유는 국내에 동일한 서비스가 없는것이었다.<br />완전 새로운 서비스를 만들어 본다는게 의미가 있을거 같았다.<br /> <br />(아마 국내에서는 내가 최초인거 같다. 해외에서는 대표적으로 Novel AI, AIdungeon 등이 있었다)<br /> <br />AI가 재밌는 소설을 작성해 줄수 있을까? 에 대해서도 고민을 해봤는데, 프롬프트 엔지니어링을 잘 해주니, 생각보다 정말 재미있어서 놀랐다 ㅋㅋ.. (진짜로 재밌다)<br /> <br />못 믿을거 같아서 실제로 5분만에 만든 소설을 보여주겠다</p><ul><li><a href="https://beakaer.tistory.com/entry/AI-%EB%AC%B8%ED%95%99-%ED%99%A9%ED%98%BC%EC%9D%98-%EC%86%8D%EC%82%AD%EC%9E%84" target="_self">[AI 문학] 소설 - 황혼의 속삭임</a></li></ul><p><a href="https://busu.ng/entry/AI-%EB%AC%B8%ED%95%99-%ED%99%A9%ED%98%BC%EC%9D%98-%EC%86%8D%EC%82%AD%EC%9E%84" target="_blank" rel="noopener">[AI 문학] 소설 - 황혼의 속삭임</a></p><ul><li><a href="https://beakaer.tistory.com/entry/AI-%EB%AC%B8%ED%95%99-%EC%86%8C%EC%84%A4-%EB%94%B0%EB%9C%BB%ED%95%9C-%EC%98%A8%EA%B8%B0-%EB%B6%80%EB%93%9C%EB%9F%AC%EC%9A%B4-%EC%86%8D%EC%82%AD%EC%9E%84" target="_self">[AI 문학] 소설 - 따뜻한 온기, 부드러운 속삭임</a></li></ul><p><a href="https://busu.ng/entry/AI-%EB%AC%B8%ED%95%99-%EC%86%8C%EC%84%A4-%EB%94%B0%EB%9C%BB%ED%95%9C-%EC%98%A8%EA%B8%B0-%EB%B6%80%EB%93%9C%EB%9F%AC%EC%9A%B4-%EC%86%8D%EC%82%AD%EC%9E%84" target="_blank" rel="noopener">[AI 문학] 소설 - 따뜻한 온기, 부드러운 속삭임</a></p><p> <br />생각보다 문학적 소양도 깊고, 문체나 글의 퀄리티도 높은 것을 알수있다...<br />가능성이 보인다!<br /> </p><h2>개발환경</h2><p>개발환경은 NEXTJS를 사용할 예정이다.</p><figure><img src="https://blog.kakaocdn.net/dn/dVXzBh/btsHRoSwxwb/2MrQrckzTZAkJLp5FV329k/img.jpg"/ /></figure>
<p>React 문법으로 Backend와 Prontend를 한번에 구축할 수 있어서 마음에 들었다.<br />저번에 토이플젝 할때 한번 써본경험이 있어서 쉽게 구축할 수 있었다.<br /> </p><pre><code>npx create-next-app@latest</code></pre><p> <br /> <br />기본 프로젝트를 생성해주었다.<br /> <br /> </p><h2>Gemini API</h2><p>이제 Gemini API키를 가져올 차례이다. <br /> <br /><a href="https://aistudio.google.com/app/apikey" target="_self">API 키 가져오기 | Google AI Studio</a></p><p><a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Faistudio.google.com%2Fapp%2Fapikey&amp;followup=https%3A%2F%2Faistudio.google.com%2Fapp%2Fapikey&amp;ifkv=AS5LTARwjOEuWsm7mlrAv5YK1qf1Nzx-AcW-mXOf4Fneugc9WRmqBAeawsggt5VH-Qad5txjYEyo&amp;passive=1209600&amp;flowName=WebLiteSignIn&amp;flowEntry=ServiceLogin&amp;dsh=S889226873%3A1717745606047839" target="_blank" rel="noopener">로그인 - Google 계정</a></p><p>Google Ai Stuido에 가입하고...<br /> </p><figure><img src="https://blog.kakaocdn.net/dn/bgvH5M/btsHQZelieq/Lr8N2kZJDJP9gXrkNaEqs0/img.png"/ /></figure>
<p> <br /> <br />여기서 Gemini API키를 가져올 수 있다.<br /> <br />사용 예시도 볼 수 있는데...</p><pre><code>/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();</code></pre><p> <br />굉장히 간단하고, 쉽게 구현이 가능하다.<br /> </p><figure><img src="https://blog.kakaocdn.net/dn/b89y2x/btsHQntihPb/Mnh6uvfsalPedWJXAJw3C0/img.png"/ /></figure>
<p> <br />여기서 무료 API의 요청 제한을 확인할 수 있는데 필자가 사용하고자 하는 Gemini 1.5 Pro API의 경우에는 분당 2회 하루에 최대 50회 요청이다.<br /> <br />유료의 경우에도 가격은 상당히 합리적인(성능에 비해) 것을 볼 수 있다.<br /> </p><h2>프로젝트 이름 정하기</h2><p>프로젝트를 본격적으로 시작하기전에 이름을 정하려고 한다.<br /><b>아무글</b>이나 읽는 다는 의미에서 프로젝트 이름은, <b>아무글(amugul)</b> 로 정했다.<br />(대충 지은거 아니고, 고민 많이 했다)<br /> </p><h2>여담</h2><p>사실 프로젝트 다 만들고, 블로그 쓰고 있다 결과가 궁금하면<br /><a href="http://z0.kro.kr:8181" target="_blank">http://z0.kro.kr:8181</a></p><p><a href="http://z0.kro.kr:8181" target="_blank" rel="noopener">아무글 | 아무생각 없이 읽는 글</a></p><p> <br />로 들어가보면 된다.</p>
