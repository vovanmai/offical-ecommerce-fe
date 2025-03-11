"use client";
import Nestable from 'react-nestable';

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import 'react-nestable/dist/styles/index.css';

// every item must have a unique `id`
// in order to distinguish elements
const items = [
  { id: 0, text: 'Andy' },
  {
    id: 1, text: 'Harry',
    children: [
      { id: 2, text: 'David' }
    ]
  },
  { id: 3, text: 'Lisa' }
];



export default function DragDropList() {
  
  const renderItem = ({ item }) => item.text;
  return (
    <body>
      <Nestable
        items={items}
        renderItem={renderItem}
      />
    </body>
  );
}
