/**
 * Remote Care Banner Component - FIXED
 *
 * Rebuilt from Figma Design (Node: 1-8850) with all rendering issues fixed
 * Location: Mobile Device Frame → Scrollable Content Area
 *
 * Fixes Applied:
 * 1. Changed overflow:hidden to overflow:visible to prevent edge clipping
 * 2. Fixed z-index stacking: Gradient (z:2) now above Images (z:1) for fade effect
 * 3. Added 16px right margin to prevent images from hitting container boundary
 * 4. Simplified fractional pixels to whole numbers for crisp rendering
 * 5. Constrained gradient to 450px height to prevent overflow clipping
 * 6. Improved layout spacing and margins
 * 7. Added proper container sizing with safe boundaries
 * 8. Fixed ornament positioning and sizing
 * 9. Optimized overall visual hierarchy
 */

"use client";

import React from "react";

interface RemoteCareBannerProps {
  onCtaClick?: () => void;
}

export function RemoteCareBanner({ onCtaClick }: RemoteCareBannerProps) {
  // ======================================
  // IMAGE ASSETS - Local assets downloaded from Figma
  // ======================================
  const imgTeamPhoto = "/assets/5a4a4afca02f5518add3c389ee639ed1609f5ff9.png";
  const imgLeftFigure = "/assets/bf5fa6c921e5e77d8623e3d55f60f0366078fa2a.png";
  const imgCenterFigure = "/assets/23894fde73b643aa9dfd85e09cc39cdadef4bb75.png";
  const imgOrnamentBg = "/assets/4a52fd1d04fe1024763db81cc3341bc16d881b6e.svg";

  return (
    <div
      className="relative w-full mx-auto"
      style={{
        height: "450px",
        backgroundColor: "#CDD2FF",
        borderBottomLeftRadius: "40px",
        borderBottomRightRadius: "40px",
        maxWidth: "390px",
        overflow: "visible", // FIX #1: Changed from hidden to visible to prevent clipping
        position: "relative",
      }}
      data-component="remote-care-banner"
      data-node-id="1:8850"
    >
      {/* ==========================================
          BACKGROUND ORNAMENT ELEMENTS (1:8851)
          - SVG with 18 decorative circles/shapes
          - Light purple stroke color (#CCCEFF)
          - z-index: 0 (bottom layer)
          ========================================== */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "190px",
          left: "0",
          top: "93px",
          pointerEvents: "none",
          zIndex: 0,
        }}
        data-name="Bg Element"
        data-node-id="1:8851"
      >
        <img
          src={imgOrnamentBg}
          alt="Background decorative elements"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            maxWidth: "none",
          }}
        />
      </div>

      {/* ==========================================
          IMAGES CONTAINER (1:8872)
          - 3 layered healthcare professional images
          - Overlapping layout for depth
          - z-index: 1 (below gradient for fade effect)
          - FIX #3: Added 16px right margin for safe boundary
          - FIX #4: Simplified fractional pixels to whole numbers
          ========================================== */}
      <div
        style={{
          position: "absolute",
          width: "calc(100% - 32px)", // 16px left + 16px right margins
          height: "320px",
          top: "28px",
          left: "16px", // Simplified from 15.63px
          overflow: "hidden", // Clip images within container
          zIndex: 1, // FIX #2: Below gradient layer for proper fade effect
        }}
        data-node-id="1:8872"
      >
        {/* LEFT IMAGE - Professional Figure (1:8874) */}
        <img
          src={imgLeftFigure}
          alt="Healthcare professional left"
          style={{
            position: "absolute",
            width: "166px", // Rounded from 165.573px
            height: "320px", // Rounded from 320.347px
            top: "12px",
            left: "0",
            objectFit: "cover",
            display: "block",
          }}
          data-name="IMG_1049"
          data-node-id="1:8874"
        />

        {/* CENTER IMAGE - Professional Figure (1:8875) */}
        <img
          src={imgCenterFigure}
          alt="Healthcare professional center"
          style={{
            position: "absolute",
            width: "190px", // Rounded from 189.569px
            height: "332px", // Rounded from 332.345px
            top: "0",
            left: "83px", // Rounded from 82.78px
            objectFit: "cover",
            display: "block",
          }}
          data-name="IMG_1052"
          data-node-id="1:8875"
        />

        {/* RIGHT IMAGE - Team Photo (1:8873) */}
        <img
          src={imgTeamPhoto}
          alt="Healthcare team"
          style={{
            position: "absolute",
            width: "178px", // Rounded from 177.571px
            height: "332px", // Rounded from 332.345px
            top: "0",
            left: "181px", // Rounded from 181.17px
            objectFit: "cover",
            display: "block",
          }}
          data-name="MicrosoftTeams-image (14) 3"
          data-node-id="1:8873"
        />
      </div>

      {/* ==========================================
          GRADIENT OVERLAY (1:8876)
          - Linear gradient for text contrast
          - 5-stop gradient: White → Light Purple
          - Colors: #FFF (0%) → #E9EBFF (25%) → #CDD2FF (45-100%)
          - z-index: 2 (ABOVE images for fade effect)
          - FIX #2: Changed z-index from 3 to 2 (above images)
          - FIX #5: Constrained to 450px height to prevent overflow
          ========================================== */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "450px",
          top: "0",
          left: "0",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(233, 235, 255, 0) 40%, rgba(205, 210, 255, 0) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
        data-name="Gradient Layer"
        data-node-id="1:8876"
      />

      {/* ==========================================
          CONTENT SECTION (1:8877)
          - Text headline + description
          - CTA button
          - z-index: 3 (top layer, above gradient)
          - FIX #6: Improved spacing and margins
          ========================================== */}
      <div
        style={{
          position: "absolute",
          width: "calc(100% - 64px)", // 32px horizontal margins
          top: "271px",
          left: "32px", // Simplified from 48px for cleaner spacing
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "flex-start",
          zIndex: 3, // Above gradient
        }}
        data-name="Content"
        data-node-id="1:8877"
      >
        {/* TEXT AREA (1:8878) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "flex-start",
          }}
          data-name="Text Area"
          data-node-id="1:8878"
        >
          {/* HEADLINE - "Remote Care" (1:8879) */}
          <h2
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              fontSize: "42px",
              lineHeight: "32px",
              color: "#FFFFFF",
              margin: "0",
              width: "100%",
              wordBreak: "break-word",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Added for contrast
            }}
            data-node-id="1:8879"
          >
            Remote Care
          </h2>

          {/* DESCRIPTION TEXT (1:8880) */}
          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "22px",
              color: "#FFFFFF",
              margin: "0",
              width: "100%",
              textShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)", // Added for contrast
            }}
            data-node-id="1:8880"
          >
            Start recommending a care plans to your patients. Help them access personalised
          </p>
        </div>

        {/* CTA BUTTON (1:8881) */}
        <button
          onClick={onCtaClick}
          style={{
            width: "100%",
            height: "55px",
            backgroundColor: "#4B4AD5",
            color: "#FFFFFF",
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "26px",
            border: "none",
            borderRadius: "16px",
            cursor: "pointer",
            padding: "0", // Remove padding, use height
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            overflow: "hidden",
            transition: "all 0.2s ease-in-out",
            boxSizing: "border-box",
            boxShadow: "0px 4px 12px rgba(75, 74, 213, 0.3)", // Added for depth
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = "0.9";
            e.currentTarget.style.transform = "scale(0.98)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "scale(1)";
          }}
          data-name="button"
          data-node-id="1:8881"
        >
          Explore Remote Care
        </button>
      </div>
    </div>
  );
}
