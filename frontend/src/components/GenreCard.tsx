// import React from 'react';
// // import axios from 'axios';
// import {
//     Box,
//     Typography,
//     Paper,
//     useTheme
//   } from "@mui/material";
  
//   interface GenreData {
//     genre: string;
//     percentage: number; 
//   }
  
//   interface GenreDataProps {
//     title?: string;
//     data: GenreData[];
//   }

// export const Genre: React.FC<GenreDataProps> = ({
//     data
//   }) => {
//     const theme = useTheme();

//   return (
//     <Paper
//     elevation={5}
//       sx={{
//         width: 900,
//         position: 'relative',
//         alignItems: 'center',
//         height: 360,
//         backgroundColor: theme.palette.background.default,
//       }}
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           minWidth: 10,
//           height: 50,
//           // border: 1,
//         }}
//       >
//       <Typography variant="h4" >
//         Musical Profile
//       </Typography>
//       </Box>

//       <Paper
//         sx={{
//           top: 50,
//           width: 400,
//           position: 'relative',
//           alignItems: 'center',
//           height: 300,
//           left: 10
//         }}
//       >
//       <Typography variant="h6" gutterBottom
//         sx = {{
//             ml: 1 
//             }}
//       >
//         Genre Distribution
//       </Typography>

//       {data.map((item) => (
//         <Box key={item.genre} sx={{ mb: 2, ml: 1 }}>

//           {/* Outer track (hidden) + inner bar (visible) */}
//           <Box
//             sx={{
//               position: "relative",
//               width: "100%",
//               height: 35,
//               backgroundColor: "transparent",
//             }}
//           >
//             {/* This bar is only as wide as the percentage */}
//             <Box
//               sx={{
//                 width: `${item.percentage}%`,
//                 height: "100%",
//                 borderRadius: 4,
//                 backgroundColor: theme.palette.primary.main,
//                 transition: "width 0.3s ease-in-out", // optional animation
//               }}
//             />
//             {/* The label at the trailing edge of the bar */}
//             <Typography
//               variant="body2"
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: `${item.percentage + 5}%`,
//                 transform: "translate(-5px, -50%)",
//                 // fontWeight: "bold",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {item.genre} ({item.percentage}%)
//             </Typography>
//           </Box>
//         </Box>
//         ))}
//         </Paper>
//     </Paper>
//   );
// };