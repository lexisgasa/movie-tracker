import { useState } from "react";
import Star from "../Components/Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  onSetRating,
}) => {
  const [rating, setRating] = useState(0);
  const [temporaryRating, setTemporaryRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <Star
              key={i}
              full={
                temporaryRating ? temporaryRating >= i + 1 : rating >= i + 1
              }
              onRate={() => handleRating(i + 1)}
              onHoverIn={() => setTemporaryRating(i + 1)}
              onHoverOut={() => setTemporaryRating(0)}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      <p style={textStyle}>{temporaryRating || rating || ""}</p>
    </div>
  );
};

export default StarRating;

// const StarRating = ({ maxRating = 5 }) => {
//   const [rating, setRating] = useState(0);

//   const handleRating = (newRating) => {
//     setRating(newRating);
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={starContainerStyle}>
//         {Array.from({ length: maxRating }, (_, i) => {
//           return (
//             <Star
//               key={i}
//               filled={i < rating}
//               onClick={() => handleRating(i + 1)}
//             />
//           );
//         })}
//       </div>
//       <p>{rating} stars</p>
//     </div>
//   );
// };

// export default StarRating;
