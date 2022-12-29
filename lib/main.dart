import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(
    const MyApp(),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Embedded-web',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const Home(),
    );
  }
}

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late bool isPageLoaded;
  late WebViewController controller;

  @override
  void initState() {
    super.initState();
    isPageLoaded = false;

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            // Update loading bar.
          },
          onPageStarted: (String url) {},
          onPageFinished: (_) {
            setState(() {
              isPageLoaded = true;
            });
          },
        ),
      )
      ..loadRequest(Uri.parse('https://dev-partnertest-emb.vietlottsms.vn/'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Embedded Web')),
      body: isPageLoaded
          ? WebViewWidget(controller: controller)
          : const Center(
              child: SizedBox(
                  height: 40, width: 40, child: CircularProgressIndicator())),
    );
  }
}

//'https://dev-partnertest-emb.vietlottsms.vn/'
// controller.loadUrl('assets/html/index.html');
// WebViewWidget(controller: controller)
