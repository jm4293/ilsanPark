import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class HomeScreen extends StatelessWidget {
  WebViewController webViewController = WebViewController()
    ..loadRequest(Uri.parse("http://192.168.0.62:4100/ilsanpark"))
    ..setJavaScriptMode(JavaScriptMode.unrestricted);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   backgroundColor: Colors.blue,
      //   title: const Text("Code"),
      //   centerTitle: true,
      // ),
      body: SafeArea(
        child: WebViewWidget(
          controller: webViewController,
        ),
      ),
    );
  }
}
