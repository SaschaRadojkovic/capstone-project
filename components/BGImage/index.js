import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

//this code is from  https://github.com/TomDoesTech/perfect-background-image-tutorial

const Box = styled.div`
  position: absolute;

  top: 60px;
`;

// const StyledPlaceHolder = styled.div`
//   width: 100%;
//   height: 10%;
// `;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function BGImage() {
  const [width, setWidth] = useState();
  const [height, setheight] = useState();

  useEffect(() => {
    const { width, height } = getWindowDimensions();

    setWidth(width);

    setheight(height);
  }, []);

  useEffect(() => {
    function handleResize() {
      const { width, height } = getWindowDimensions();

      setWidth(width);

      setheight(height);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width && height) {
    return (
      <Box>
        {/* <StyledPlaceHolder></StyledPlaceHolder> */}
        <Image
          src="/../public/lb.jpg"
          width={width}
          height={height}
          alt="a knive and leafs on a wooden table"
        />
      </Box>
    );
  }

  return null;
}

export default BGImage;
