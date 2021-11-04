# fullscreen-react

A React component that sets its children to fullscreen using the Fullscreen API.

## Usage

### Install.

```bash
yarn add fullscreen-react
```

### Import component.

```javascript
import Fullscreen from 'fullscreen-react';
```

### Setup and render.

```jsx
import React, { useState } from "react";
import Fullscreen from "fullscreen-react";

function App() {
  const [isEnter, setIsEnter] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setIsEnter(true);
        }}
      >
        Go Fullscreen
      </button>

      <Fullscreen isEnter={isEnter} onChange={setIsEnter}>
        <div>
          Hi! This may cover the entire monitor.
        </div>
      </Fullscreen>
    </div>
  );
}

export default App;
```
