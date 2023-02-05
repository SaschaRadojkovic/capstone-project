import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

//this code is from  https://github.com/TomDoesTech/perfect-background-image-tutorial

const Box = styled.div`
  position: fixed;
  z-index: -1;
  top: 40px;
`;

export function getWindowDimensions() {
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
    function handleResize() {
      const { width, height } = getWindowDimensions();

      setWidth(width);

      setheight(height);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width && height) {
    return (
      <Box>
        <Image
          src="/lb.jpg"
          width={width}
          height={height}
          alt="a knive and leafs on a wooden table"
          priority={true}
        />
      </Box>
    );
  }

  return null;
}

export default BGImage;
