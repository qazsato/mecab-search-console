Mecab Search Console
==

Google Search Consoleの検索アナリティクスの結果をもとに、ワード単位での検索流入数を算出するツールです。  
ページ毎のSEO流入解析時に使用することを想定しています。

使用方法
--

1. [Google Search Console](https://www.google.com/webmasters/tools/home?hl=ja)にアクセスし、検索アナリティクスから任意のCSVファイルをDLします。
2. 下記ボタンを押下し、Mecab Search ConsoleをHeroku上にデプロイします。  

  [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
3. 2.でデプロイしたURLにアクセスし、CSVファイルをドラッグアンドドロップし、Submitボタンを押下します。
4. 解析が完了すると、ワード毎の検索流入数が降順で表示されます。


備考
--
- ワード単位の分解には、形態素解析(mecab)を使用しています。
- 検索流入数は、ワード毎のクリック数(=流入数)を全て合算したものを表示しています。
