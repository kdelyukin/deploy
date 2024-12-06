import React from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  children?: React.ReactNode;
}

function VideoBackground({ videoSrc, children }: VideoBackgroundProps) {
  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  };

  const videoStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",
    zIndex: -1,
    objectFit: "cover",
  };


  return (
    <div style={containerStyle}>
      <video autoPlay loop muted style={videoStyle}>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>{children}</div>
    </div>
  );
}

export default VideoBackground;
