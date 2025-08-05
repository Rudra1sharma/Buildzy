// "use client";
// import React from "react";
// import { Editor, Frame, Element,useEditor } from "@craftjs/core";
// import Container from '../../components/Container';
// import TextComponent from "../../components/TextComponent";
// import { Button } from "../../components/Button";
// // const TextComponent = ({ text }) => {
// //   const { connectors: { drag } } = useNode();

// //   return (
// //     <div ref={drag}>
// //       <h2>{text}</h2>
// //     </div>
// //   );
// // };

// // const Container = ({ children }) => {
// //   const { connectors: { drag } } = useNode();

// //   return (
// //     <div ref={drag} style={{ padding: "20px", border: "1px solid black" }}>
// //       {/* Ensure the Element inside has an `id` */}
// //       <Canvas id="drop_section">
// //          // Now users will be able to drag/drop components into this section
// //         <TextComponent />
// //       </Canvas>
// //     </div>
// //   );
// // };

// const SaveButton = () => {
//   const { query } = useEditor();
//   return <a onClick={() => console.log(query.serialize()) }>Get JSON</a>
// }

// export default function EditorComp() {
//   return (
//     <div>
//       <header>Some fancy header or whatever</header>
//       <Editor resolver={{ TextComponent, Container }}>
//         <Frame>
//           <Element is={Container} canvas>
//             <TextComponent text="I'm already rendered here" />
//           </Element>
//         </Frame>
//           <SaveButton/>
//       </Editor>
//     </div>
//   );
// }


'use client'; 

import StudioEditor from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
import { useSession } from 'next-auth/react'; // Import useSession

export default function App() {
  const { data: session, status } = useSession(); // Get session data and status
    console.log("Session data:", session); // Log session data for debugging
  if (status === "loading") {
    return <p>Loading editor...</p>; // Show loading state
  }

  if (status === "unauthenticated" || !session || !session.user || !session.user.id) {
    // Handle cases where the user is not authenticated or session/user ID is missing
    // You might want to redirect to login or show an appropriate message
    return <p>User not authenticated. Please log in to use the editor.</p>;
  }

  // Ensure session.user.id is a string. Adjust if your user ID is in a different field, e.g., session.user.sub
  const userId = String(session.user.id); 

  return (
    
    <div style={{ height: '100vh', width: '100%' }}> {/* Or other desired dimensions */}
      <StudioEditor
        options={{
          licenseKey: 'DEMO_LOCALHOST_KEY', // Replace with your actual license key for production
      project: {
        type: 'web',
        id: 'ProjectId' // Using the project ID you specified
      },
      identity: {
        id: userId // Using the logged-in user's unique ID
      },
      assets: {
        storageType: 'cloud'
      },
      storage: {
        type: 'cloud',
        autosaveChanges: 100,
        autosaveIntervalMs: 10000
      }
      }}
    />
    </div>
  );
}