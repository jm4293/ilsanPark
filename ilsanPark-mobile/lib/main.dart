import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primaryColor: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final postList = [
    {
      "title": "Sample Title 1",
      "color": Colors.blue,
    },
    {
      "title": "Sample Title 2",
      "color": Colors.green,
    },
    {
      "title": "Sample Title 3",
      "color": Colors.red,
    },
    {
      "title": "Sample Title 4",
      "color": Colors.blue,
    },
    {
      "title": "Sample Title 5",
      "color": Colors.blue,
    },
    {
      "title": "Sample Title 6",
      "color": Colors.blue,
    },
    {
      "title": "Sample Title 7",
      "color": Colors.blue,
    },
    {
      "title": "Sample Title 8",
      "color": Colors.blue,
    },
    {
      "title": "Sample Title 9",
      "color": Colors.blue,
    },
    {
      "title": "Sample Title 10",
      "color": Colors.blue,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Test Title")),
      body: ListView.builder(
        itemCount: postList.length,
        itemBuilder: (BuildContext context, int idx) {
          return postContainer(
            title: postList[idx]["title"] as String,
          );
        },
      ),
    );
  }

  Widget postContainer({String title = ""}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(10),
          child: Text(
            title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        Container(
          width: MediaQuery.of(context).size.width,
          height: 200,
          color: Colors.blue,
        ),
      ],
    );
  }
}
