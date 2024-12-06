// components/common/LoadingSpinner.jsx
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-highlight"></div>
    </div>
  );
};

export default LoadingSpinner;


// V2
// components/common/LoadingSpinner.jsx
// 'use client';

// import React from 'react';

// const LoadingSpinner = ({ size = 'medium', color = 'highlight' }) => {
//   const sizeClasses = {
//     small: 'h-4 w-4',
//     medium: 'h-8 w-8',
//     large: 'h-12 w-12'
//   };

//   const colorClasses = {
//     highlight: 'border-highlight',
//     white: 'border-white',
//     gray: 'border-gray-400'
//   };

//   return (
//     <div className="flex justify-center items-center p-4">
//       <div 
//         className={`
//           animate-spin 
//           rounded-full 
//           border-2 
//           border-t-transparent 
//           ${sizeClasses[size]} 
//           ${colorClasses[color]}
//         `}
//       >
//         <span className="sr-only">Loading...</span>
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;



// V3
// components/common/LoadingSpinner.jsx
// 'use client';

// import React from 'react';

// export const ShimmerCard = () => (
//   <div className="relative bg-background-light rounded-lg overflow-hidden shadow-xl animate-pulse">
//     <div className="aspect-[9/16] bg-gray-700" />
//     <div className="p-4">
//       <div className="flex items-start justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="h-10 w-10 rounded-full bg-gray-700" />
//           <div>
//             <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
//             <div className="h-3 w-16 bg-gray-700 rounded" />
//           </div>
//         </div>
//         <div className="h-8 w-20 bg-gray-700 rounded-full" />
//       </div>
//       <div className="mt-4 space-y-2">
//         <div className="h-4 w-3/4 bg-gray-700 rounded" />
//         <div className="h-4 w-1/2 bg-gray-700 rounded" />
//       </div>
//     </div>
//   </div>
// );

// const LoadingSpinner = ({ type = 'spinner' }) => {
//   if (type === 'shimmer') {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {[1, 2, 3, 4, 5, 6].map((i) => (
//           <ShimmerCard key={i} />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center p-4">
//       <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-highlight">
//         <span className="sr-only">Loading...</span>
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;
