import * as React from "react"
import Svg, { ClipPath, Defs, G, Path, Circle, Text, TSpan, Ellipse, Pattern, Image, Rect } from "react-native-svg"

export function SearchBtmIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={22}
      viewBox="0 0 24 22"
      {...props}
    >
      <G clipPath="url(#clip-11269f37-b809-4763-bcf8-e74fae33b26a)">
        <Path
          fill={props.color ? props.color : "#5b4dbc"}
          d="M10.317 2.054a8.12 8.12 0 00-8.238 8.124c-.015 4.506 3.496 8.155 8.09 8.193 4.508.037 8.164-3.463 8.24-8.05.075-4.567-3.593-8.264-8.092-8.267m8.094 13.903c.848.726 1.672 1.434 2.498 2.14.64.547 1.285 1.091 1.926 1.637.497.423.604.988.265 1.39-.37.436-.925.436-1.442-.004l-4.004-3.417c-.133-.114-.27-.222-.426-.35-2.405 2.222-5.224 3.163-8.444 2.723-2.312-.316-4.268-1.39-5.866-3.098C-.628 13.186-.518 7.342 2.714 3.66c3.34-3.805 8.838-4.53 13.12-1.709a9.424 9.424 0 013.42 3.963 10.023 10.023 0 01.922 5.11c-.145 1.803-.749 3.432-1.765 4.933"
        />
      </G>
    </Svg>
  )
}

export function HeartBtmIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 25}
      height={props.height ?? 23
      }
      viewBox="0 0 25 23"
      {...props}
    >
      <G clipPath="url(#clip-0c41308f-63da-46e5-954a-48c7c6b82461)">
        <Path
          fill={props.color ? props.color : "#aaa"}
          d="M12.186 4.701c-.392-.359-.85-.759-1.287-1.182-.98-.95-2.148-1.437-3.51-1.45-1.76-.016-3.242.578-4.277 2.058-1.501 2.147-1.206 4.825.705 6.853 2.552 2.707 5.089 5.428 7.636 8.14.238.252.508.473.777.721.088-.092.185-.192.28-.294 1.241-1.319 2.484-2.636 3.723-3.957 1.548-1.65 3.126-3.275 4.631-4.965 1.7-1.909 1.782-4.602.365-6.569-1.744-2.419-5.603-2.627-7.592-.684-.484.472-.996.914-1.45 1.33m.442 17.59h-.85c-.21-.206-.427-.406-.629-.62-2.943-3.136-5.884-6.273-8.825-9.41C.66 10.487-.156 8.392.273 5.976 1.132 1.15 5.713-.933 9.803.538c.858.309 1.622.879 2.428 1.329.01.068.072.032.124-.014C13.96.454 15.822-.092 17.931.129c2.28.239 4.006 1.346 5.22 3.274.532.845.805 1.791 1.024 2.756v1.953c-.03.105-.068.21-.089.317-.258 1.318-.815 2.491-1.73 3.48a1034.526 1034.526 0 01-4.796 5.149c-1.64 1.749-3.287 3.49-4.931 5.234"
        />
      </G>
    </Svg >
  )
}

export function ChatBtmIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={19}
      viewBox="0 0 23 19"
      {...props}
    >
      <Path
        fill={props.color ? props.color : "#aaa"}
        d="M2.47 12.262l1.409-1.493H15.15V2.936H2.47zm-.814 4.103l-.072-.076a.885.885 0 01-.324.061.914.914 0 01-.902-.923c0-.12.023-.24.067-.352l-.069-.073v-4.086l.002-8.224c0-1.103.897-2 2-2h12.906c1.103 0 2 .897 2 2v8.276c0 1.103-.897 2-2 2H4.899l-3.241 3.397h-.001zm7.2 2.228a.75.75 0 01-.75-.75V17.1a.75.75 0 01.75-.75h11.93V8.884a.75.75 0 01.75-.75h.613a.75.75 0 01.75.75v8.958a.75.75 0 01-.75.75z"
      />
    </Svg>
  )
}

export function ProfileBtmIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={22}
      viewBox="0 0 23 22"
      {...props}
    >
      <Path
        fill={props.color ? props.color : "#aaa"}
        d="M20.425 11.097c0 5.019-4.083 9.102-9.102 9.102s-9.102-4.083-9.102-9.102 4.083-9.102 9.102-9.102 9.102 4.083 9.102 9.102zm-1.387 7.715a10.84 10.84 0 003.195-7.715 10.84 10.84 0 00-3.195-7.714A10.84 10.84 0 0011.323.187a10.838 10.838 0 00-7.714 3.196 10.839 10.839 0 00-3.196 7.714 10.84 10.84 0 003.196 7.715c2.06 2.06 4.8 3.195 7.714 3.195a10.84 10.84 0 007.715-3.195z"
      />
      <Path
        fill={props.color ? props.color : "#aaa"}
        d="M6.604 15.218c.8-1.043 1.834-1.589 3.55-1.772a.71.71 0 00.617-.705c0-.25-.788-.99-.788-.99-.823-.856-1.249-2.255-1.249-3.33 0-1.661 1.317-3.01 2.94-3.01 1.625 0 2.941 1.349 2.941 3.01 0 1.07-.436 2.46-1.252 3.316.006.005-.784.754-.784 1.004 0 .341.241.629.56.694 1.753.178 2.797.726 3.606 1.783a6.662 6.662 0 01-5.07 2.332 6.663 6.663 0 01-5.07-2.332z"
      />
    </Svg>
  )
}


export function LocationBtmIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={24}
      viewBox="0 0 19 24"
      {...props}
    >
      <G clipPath="url(#clip-76e8f847-b58c-4087-a1c5-770e7a94da17)">
        <Path
          fill={props.color ? props.color : "#aaa"}
          d="M18.845 9.634c-.118.575-.2 1.16-.36 1.721-.54 1.89-1.432 3.63-2.52 5.243-1.457 2.158-3.013 4.25-4.559 6.346-.72.976-1.579 1.274-2.536.917a2.306 2.306 0 01-.954-.676c-2.381-2.965-4.696-5.983-6.339-9.438A15.458 15.458 0 01.43 10.422C.096 8.883.4 7.353 1.041 5.927 2.484 2.719 4.934.807 8.445.317c.092-.014.18-.053.27-.08h1.648c.091.026.182.055.274.078.793.2 1.626.302 2.37.616 3.198 1.35 5.094 3.768 5.679 7.2.066.39.107.782.16 1.174zM1.927 9.35c.025.286-.004.59.085.855.342 1.008.633 2.048 1.104 2.996 1.608 3.235 3.767 6.11 6.013 8.92.265.331.592.333.854-.006.831-1.073 1.666-2.143 2.474-3.234 1.48-1.998 2.81-4.091 3.882-6.34.797-1.674 1.097-3.384.537-5.22-1.121-3.68-4.812-6.118-8.83-5.314a7.608 7.608 0 00-6.12 7.343"
        />
      </G>
      <G clipPath="url(#clip-76e8f847-b58c-4087-a1c5-770e7a94da17)">
        <Path
          fill="#fff"
          d="M14.006 9.47A4.44 4.44 0 009.57 5.019 4.449 4.449 0 005.1 9.48c.005 2.434 2.02 4.44 4.462 4.439a4.461 4.461 0 004.445-4.45m-12.08-.12a7.608 7.608 0 016.12-7.343c4.018-.805 7.709 1.634 8.83 5.314.56 1.836.26 3.546-.537 5.22-1.072 2.249-2.402 4.342-3.882 6.34-.808 1.09-1.643 2.161-2.474 3.234-.262.339-.589.337-.854.005-2.246-2.81-4.405-5.684-6.013-8.92-.471-.947-.762-1.987-1.104-2.995-.09-.265-.06-.57-.085-.855"
        />
      </G>
      <G clipPath="url(#clip-76e8f847-b58c-4087-a1c5-770e7a94da17)">
        <Path
          fill={props.color ? props.color : "#aaa"}
          d="M12.418 9.48c-.01-1.555-1.316-2.86-2.859-2.857-1.558.003-2.866 1.305-2.863 2.849.003 1.56 1.294 2.843 2.863 2.845 1.571.003 2.87-1.286 2.86-2.837m1.587-.01c0 2.447-2 4.449-4.445 4.45-2.441.001-4.457-2.005-4.462-4.439A4.449 4.449 0 019.57 5.02a4.44 4.44 0 014.437 4.45"
        />
      </G>
    </Svg>
  )
}

export function LocationBtmIconFocused(props) {
  return (
    <Svg
      data-name="Group 163"
      xmlns="http://www.w3.org/2000/svg"
      width={17.839}
      height={22.856}
      viewBox="0 0 17.839 22.856"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 131"
            fill="#5b4dbc"
            d="M0 0H17.839V22.856H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 149" clipPath="url(#a)" fill="#5b4dbc">
        <Path
          data-name="Path 187"
          d="M17.839 9.036c-.113.552-.192 1.114-.346 1.655a17.763 17.763 0 01-2.424 5.041c-1.4 2.075-2.9 4.087-4.383 6.1a1.983 1.983 0 01-2.438.882 2.217 2.217 0 01-.918-.65 46.92 46.92 0 01-6.095-9.074 14.863 14.863 0 01-1.1-3.2A6.893 6.893 0 01.72 5.471 8.717 8.717 0 017.839.076 1.819 1.819 0 008.1 0h1.583c.088.025.175.053.264.075a15.706 15.706 0 012.278.592 8.669 8.669 0 015.461 6.924c.064.374.1.752.153 1.128zM1.572 8.762a3.587 3.587 0 00.082.822 23 23 0 001.061 2.881A48.475 48.475 0 008.5 21.042a.47.47 0 00.821 0c.8-1.032 1.6-2.061 2.379-3.11a37.081 37.081 0 003.733-6.1 6.7 6.7 0 00.517-5.019A7.339 7.339 0 001.572 8.762"
        />
        <Path
          data-name="Path 188"
          d="M11.307 18.391a7.339 7.339 0 0114.375-1.95 6.7 6.7 0 01-.517 5.019 37.079 37.079 0 01-3.733 6.1c-.777 1.049-1.58 2.078-2.379 3.11a.47.47 0 01-.821 0 48.481 48.481 0 01-5.782-8.577 23.009 23.009 0 01-1.061-2.881 3.581 3.581 0 01-.082-.822m11.615.115a4.282 4.282 0 10-4.275 4.279 4.269 4.269 0 004.275-4.279"
          transform="translate(-9.736 -9.629)"
        />
        <Path
          data-name="Path 189"
          d="M41.824 37.369a4.282 4.282 0 11-4.266-4.28 4.29 4.29 0 014.266 4.28m-1.527.009a2.751 2.751 0 10-2.75 2.729 2.746 2.746 0 002.75-2.729"
          transform="translate(-28.638 -28.491)"
        />
      </G>
    </Svg>
  )
}


export function WallBtmIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={21}
      height={22}
      viewBox="0 0 21 22"
      {...props}
    >
      <Defs>
        <Pattern
          id="a"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          viewBox="0 0 300 312"
        >
          <Image
            width={300}
            height={312}
            xlinkHref="data:image/png;base64,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"
          />
        </Pattern>
      </Defs>
      <Path
        data-name="App-Icon-abstract-no-continent"
        fill="url(#a)"
        d="M0 0H21V22H0z"
      />
    </Svg>
  )
}




export function SearchIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 21}
      height={props.height ?? 21}
      viewBox="0 0 21 21"
      {...props}
    >
      <Path
        fill={props.color ?? "#fff"}
        d="M20.085 18.869l-3.405-3.337-.08-.122a.8.8 0 00-1.127 0 8.026 8.026 0 01-10.423.337 7.635 7.635 0 01-1.69-10.08 7.991 7.991 0 019.984-2.947 7.69 7.69 0 014.275 9.318.775.775 0 00.18.766.814.814 0 00.767.23.793.793 0 00.587-.535A9.274 9.274 0 0014.2 1.329 9.652 9.652 0 002.184 4.45a9.204 9.204 0 001.348 12.108 9.684 9.684 0 0012.42.512l3.015 2.954a.81.81 0 001.127 0 .78.78 0 00.011-1.1l-.011-.012z"
      />
    </Svg>
  )
}


export function FilterIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={26}
      viewBox="0 0 23 26"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path d="M-.008 26.029V.268h23.047v25.76z" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#a)">
        <Path
          fill="#161615"
          d="M7.593 26.029c-.406-.17-.837-.295-1.212-.515-.935-.547-1.556-1.36-1.864-2.453-1.078 0-2.16.006-3.242-.006-.247-.003-.512-.03-.736-.123-.422-.177-.616-.626-.52-1.073.09-.424.463-.733.934-.738 1.026-.009 2.052-.003 3.077-.003h.48c.417-1.444 1.317-2.4 2.718-2.854 1.995-.644 4.225.49 4.872 2.479.097.299.22.383.523.382 3.107-.012 6.214-.008 9.32-.007.851 0 1.119.287 1.094 1.127-.012.405-.25.627-.594.735-.22.069-.468.077-.703.077-3.003.005-6.006.009-9.008-.004-.354-.001-.535.074-.673.442-.487 1.301-1.436 2.113-2.79 2.445-.085.021-.165.059-.248.089zm-1.256-3.953c0 1.121.962 2.058 2.092 2.038 1.026-.017 1.964-.955 1.979-1.979.016-1.135-.918-2.096-2.035-2.094a2.04 2.04 0 00-2.036 2.035"
        />
      </G>
      <G clipPath="url(#a)">
        <Path
          fill="#161615"
          d="M14.546 11.159c-1.156.04-2.054.935-2.04 2.036.014 1.078 1.038 2.076 2.078 2.025 1.119-.054 2.065-1.033 2.016-2.087-.052-1.12-.978-2.01-2.054-1.974m-3.876 1.029c.865-2.033 2.196-3.06 3.887-3.015 1.878.05 3.18 1.055 3.885 3.015 1.178 0 2.366-.005 3.554.002.75.004 1.05.319 1.039 1.06-.009.572-.38.888-1.084.893-1.01.009-2.022.002-3.033.002h-.484c-.468 1.515-1.415 2.51-2.942 2.908-1.895.494-4.036-.657-4.642-2.521-.105-.322-.255-.394-.565-.393-3.003.01-6.006.008-9.009.003-.204 0-.418-.02-.611-.083-.474-.153-.718-.556-.658-1.03.053-.424.417-.78.866-.833.146-.017.297-.008.445-.008h9.352"
        />
      </G>
      <G clipPath="url(#a)">
        <Path
          fill="#161615"
          d="M6.337 4.262A2.05 2.05 0 008.386 6.29c1.072-.01 2.043-.983 2.021-2.03-.023-1.152-.913-2.043-2.037-2.039a2.037 2.037 0 00-2.033 2.04m-1.85.955c-1.123 0-2.223.011-3.322-.009-.256-.005-.542-.063-.757-.192-.363-.22-.478-.595-.386-1.013.086-.387.466-.702.912-.73.385-.024.773-.008 1.16-.009h2.415C4.972 1.711 5.973.73 7.538.366c1.912-.444 3.939.68 4.554 2.534.103.308.245.37.537.37 3.048-.01 6.096-.007 9.144-.006.178 0 .36-.001.533.032.511.098.729.39.729.945 0 .57-.202.842-.726.942-.173.032-.354.031-.532.031-3.034.002-6.067.007-9.1-.006-.332-.001-.477.08-.595.415-.533 1.519-1.993 2.554-3.601 2.607-1.63.053-3.117-.907-3.767-2.438-.075-.176-.14-.356-.226-.576"
        />
      </G>
    </Svg>
  )
}


export function HeartWhiteIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={17}
      viewBox="0 0 20 17"
      {...props}
    >
      <G clipPath="url(#clip-9b68b143-2141-40dd-9dff-b49c4dc0d918)">
        <Path
          fill={props.color ?? "#fff"}
          d="M9.693 15.332c.062-.038.108-.056.14-.088 2.323-2.361 4.657-4.711 6.958-7.093.91-.94 1.296-2.087 1.07-3.413-.451-2.642-3.495-4-5.695-2.487-.677.465-1.227 1.115-1.827 1.69-.529.508-.776.503-1.304-.024-.496-.494-.982-1.004-1.515-1.457C5.784.987 2.995 1.568 1.958 3.6c-.835 1.633-.558 3.315.797 4.7 2.213 2.263 4.437 4.515 6.657 6.771.089.09.186.173.281.26m.041-12.43c.396-.422.727-.827 1.11-1.175C12.251.447 13.898.047 15.7.648c1.83.61 2.985 1.929 3.344 3.824.328 1.726-.153 3.274-1.393 4.543-2.453 2.51-4.917 5.008-7.38 7.508-.4.406-.73.403-1.131-.005-2.485-2.524-4.991-5.028-7.443-7.584A5.031 5.031 0 013.116.88C4.832.037 7.08.355 8.512 1.66c.406.37.773.783 1.222 1.241"
        />
      </G>
    </Svg>
  )
}

export function HeartFilled(props) {
  return (
    <Svg width={20} height={17} viewBox="0 0 122.88 107.39">
      <Path
        fill={props.color ?? 'red'}
        fillRule="evenodd"
        d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
      />
    </Svg>
  )
}

export function InstaIcon(props) {
  return (
    <Svg
      width={19}
      height={18}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 18"
      {...props}
    >
      <G clipPath="url(#clip-25295054-3d70-47d6-82d8-c3f567a41270)">
        <Path
          d="M4.251 15.812a2.769 2.769 0 01-1.024-.666 2.751 2.751 0 01-.666-1.023c-.122-.314-.266-.786-.306-1.653-.043-.939-.052-1.22-.052-3.597s.01-2.659.052-3.598c.04-.867.185-1.338.306-1.653.162-.415.355-.711.666-1.023a2.748 2.748 0 011.024-.666c.313-.122.785-.267 1.653-.307.938-.043 1.22-.051 3.596-.051 2.377 0 2.659.01 3.598.051.867.04 1.338.185 1.652.307a2.76 2.76 0 011.024.666c.312.31.504.608.666 1.023.122.314.267.786.306 1.653.044.94.052 1.22.052 3.598 0 2.376-.008 2.658-.052 3.597-.04.867-.184 1.34-.306 1.653a2.76 2.76 0 01-.666 1.023 2.763 2.763 0 01-1.024.666c-.313.122-.785.266-1.652.306-.939.043-1.22.052-3.598.052-2.376 0-2.658-.009-3.596-.052-.868-.04-1.34-.184-1.653-.306zM14.252 5.189a1.07 1.07 0 10-.001-2.138 1.07 1.07 0 00.001 2.138zM4.93 8.873a4.57 4.57 0 109.14 0 4.57 4.57 0 00-9.14 0zm.9-8.848C4.884.068 4.237.22 3.67.44a4.368 4.368 0 00-1.577 1.026c-.494.495-.8.991-1.026 1.577-.22.566-.37 1.213-.414 2.16C.61 6.153.6 6.456.6 8.873c0 2.418.01 2.721.054 3.67.043.948.194 1.595.414 2.16a4.352 4.352 0 001.026 1.578c.495.494.991.798 1.577 1.026.567.22 1.213.37 2.16.414.95.043 1.253.054 3.67.054 2.418 0 2.721-.01 3.67-.054.948-.043 1.595-.194 2.16-.414a4.377 4.377 0 001.577-1.026 4.371 4.371 0 001.027-1.577c.22-.566.371-1.213.414-2.16.043-.95.053-1.253.053-3.67 0-2.418-.01-2.721-.053-3.67-.044-.948-.194-1.595-.414-2.16a4.377 4.377 0 00-1.027-1.578A4.365 4.365 0 0015.331.44c-.566-.22-1.213-.371-2.16-.414-.95-.043-1.253-.054-3.67-.054-2.418 0-2.72.01-3.67.054m.703 8.848a2.967 2.967 0 115.934-.001 2.967 2.967 0 01-5.934 0"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}


export function LinkedinIcon(props) {
  return (
    <Svg
      width={22}
      height={21}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 21"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path d="M.565 20.817V.883h20.56v19.934z" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#a)">
        <Path
          d="M12.148 20.817H7.546V7.26h4.57c.01.622.018 1.246.027 1.869l.019.003c.11-.154.217-.31.33-.461.642-.86 1.48-1.407 2.54-1.605a5.757 5.757 0 011.583-.069c.812.074 1.577.301 2.264.755.774.51 1.315 1.213 1.679 2.058.253.59.416 1.206.48 1.845.046.444.082.89.083 1.337.008 2.568.004 5.137.004 7.705v.117h-4.569v-.12-7.363a5.47 5.47 0 00-.15-1.345c-.098-.387-.253-.746-.538-1.036-.27-.272-.603-.415-.978-.472a2.405 2.405 0 00-1.14.084c-.52.174-.907.517-1.193.98-.189.304-.34.625-.378.988-.016.15-.03.3-.03.451-.002 2.569-.001 5.138-.001 7.706v.13"
          fill="#fff"
        />
      </G>
      <G clipPath="url(#a)">
        <Path d="M.87 20.816V7.26h4.52v13.556z" fill="#fff" />
      </G>
      <G clipPath="url(#a)">
        <Path
          d="M3.026 5.485c-.559-.017-1.08-.14-1.54-.47a2.135 2.135 0 01-.88-1.41A2.304 2.304 0 01.75 2.258c.28-.642.773-1.049 1.436-1.241.705-.205 1.409-.185 2.08.131.636.3 1.032.814 1.188 1.498.157.692.044 1.34-.392 1.913-.35.461-.826.727-1.388.841-.213.044-.432.057-.649.085"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export function FbIcon(props) {
  return (
    <Svg
      width={22}
      height={21}
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.469 14V7.875h2.25l.428-2.534H5.469V3.697c0-.693.374-1.369 1.573-1.369H8.26V.171S7.155 0 6.099 0C3.893 0 2.452 1.214 2.452 3.41v1.931H0v2.534h2.452V14h3.017z"
        fill="#ffffff"
      />
    </Svg>
  )
}


export function TickIcon(props) {
  return (
    <Svg
      width={props.width ? props.width : 14}
      height={props.height ? props.height : 11}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 11"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            d="M3.031 9.4L.776 6.713a.862.862 0 011.32-1.108L3.685 7.5 10.644.78a.941.941 0 111.308 1.354L4.437 9.392a.939.939 0 01-.318.203A.858.858 0 013.03 9.4z"
            fill="#fff"
          />
        </ClipPath>
      </Defs>
      <Path
        d="M3.918 9.77L1.663 7.083a.862.862 0 011.32-1.108l1.59 1.895L11.53 1.15a.941.941 0 111.308 1.354L5.324 9.762a.939.939 0 01-.319.203.858.858 0 01-1.087-.195z"
        fill="#5b4dbc"
      />
      <Path
        d="M3.031 9.4L.776 6.713a.862.862 0 011.32-1.108L3.685 7.5v0L10.644.78a.941.941 0 111.308 1.354L4.437 9.392a.939.939 0 01-.318.203A.858.858 0 013.03 9.4z"
        fillOpacity={0}
        fill="#fff"
        stroke={props.color ?? "#000"}
        strokeMiterlimit={20}
        strokeWidth={2}
        clipPath='url("#a")'
      />
    </Svg >
  )
}

export function CrossIcon(props) {
  return (
    <Svg
      width={props.width ?? 13}
      height={props.height ?? 13}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13 13"
      {...props}
    >
      <G clipPath="url(#clip-5274bc9d-86de-4302-8f56-4031a0831ca0)">
        <Path
          d="M1.41.08h.48c.265.186.561.34.79.563 1.108 1.081 2.2 2.18 3.294 3.275.223.223.434.458.72.761.107-.153.165-.27.253-.358C8.152 3.111 9.354 1.9 10.573.703c.245-.24.553-.417.832-.623h.548c.508.2.834.56.959 1.095v.205c-.217.336-.388.716-.66.999-1.067 1.106-2.165 2.182-3.253 3.267-.209.207-.426.405-.652.62.109.115.183.2.262.278 1.222 1.226 2.453 2.443 3.659 3.683.26.268.431.623.644.937v.274c-.33 1.141-1.459 1.418-2.303.498C9.43 10.652 8.152 9.46 6.916 8.23c-.08-.079-.163-.154-.303-.285-.086.117-.149.229-.236.317a1498.35 1498.35 0 01-3.87 3.869c-.453.452-1.061.5-1.548.136-.638-.478-.686-1.272-.097-1.865C2.14 9.117 3.425 7.84 4.707 6.557c.087-.087.17-.178.286-.302C3.623 4.9 2.267 3.563.922 2.217c-.164-.164-.323-.366-.397-.58C.292.957.611.423 1.41.08"
          fill={props.color ?? "#5b4dbc"}
        />
      </G>
    </Svg>

  )
}

export function ArrowDown(props) {
  return (
    <Svg
      width={14}
      height={8}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 8"
      {...props}
    >
      <G clipPath="url(#clip-f165877c-39a0-40b3-8f59-5f8c5dae0445)">
        <Path
          d="M1.873.887c.208.17.431.326.621.515 1.477 1.467 2.947 2.942 4.42 4.413.083.083.17.162.27.256.1-.094.187-.172.27-.255 1.472-1.472 2.943-2.946 4.42-4.414.19-.189.413-.344.621-.515h.393l.59.587v.392c-.196.226-.38.466-.592.678-1.68 1.68-3.365 3.354-5.049 5.03-.453.451-.867.453-1.325-.003C4.775 5.84 3.04 4.108 1.304 2.376.694 1.768.747 1.32 1.48.886z"
          fill="#161615"
        />
      </G>
    </Svg>
  )
}



export function TickIconWhite(props) {
  return (
    <Svg
      width={35}
      height={26}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 35 26"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path d="M2.292 22.846V3.152h30.28v19.694z" />
        </ClipPath>
      </Defs>
      <Path
        d="M2.292 22.846V3.152h30.28v19.694z"
        fill="#fff"
        transform="rotate(-12 248.43 658)"
      />
      <G clipPath="url(#a)" transform="rotate(-12 248.43 658)">
        <Path
          d="M10.17 22.846c-1.767-2.359-3.533-4.718-5.304-7.074-.76-1.011-1.513-2.029-2.3-3.018-.4-.502-.371-.858.152-1.245A78.604 78.604 0 005.837 9.09c.53-.435.866-.297 1.232.19 1.391 1.855 2.798 3.698 4.2 5.544.126.167.259.33.412.523 3.32-2.3 6.626-4.593 9.933-6.883 2.358-1.633 4.715-3.265 7.074-4.896.87-.602.92-.592 1.535.306.64.935 1.279 1.871 1.917 2.808.623.912.607 1.013-.279 1.625-5.758 3.976-11.52 7.947-17.272 11.93-1.225.847-2.42 1.738-3.63 2.609z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}


export function BackIcon(props) {
  return (
    <Svg
      data-name="button back"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 12.537}
      height={props.height ?? 25.841}
      viewBox="0 0 12.537 25.841"
      {...props}
    >
      <Path
        data-name="arrow back"
        d="M.249 13.286l.5-.41L0 12.3 10.7 0l1.84 1.415L2.72 12.7l9.567 11.693-1.767 1.446z"
        fill={props.color ? props.color : "#fff"}
      />
    </Svg>
  )
}



// HAPPENING TERMS CONDITION ICONS

export function LOCALCOMMUNITIES(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={59.794}
      height={50.545}
      viewBox="0 0 59.794 50.545"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 318"
            fill="#fa7c53"
            d="M0 0H59.794V50.545H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 614">
        <G data-name="Group 613" clipPath="url(#a)" fill="#fa7c53">
          <Path
            data-name="Path 1173"
            d="M.141 64.768c-.425-1.372.123-1.882 1.506-1.847 2.146.054 4.295.015 6.6.015V61.12 41.048a3.232 3.232 0 01.087-1.367 1.744 1.744 0 011.072-.843c.21-.04.664.538.8.912a4.3 4.3 0 01.059 1.377V62.827h39.04v-1.576-20.226a3.116 3.116 0 01.044-1.22 4.5 4.5 0 01.931-1.026c.31.332.741.615.9 1.008a3.929 3.929 0 01.056 1.375v21.773c2.242 0 4.336-.049 6.426.028a9.709 9.709 0 012.133.569v1.235H.141"
            transform="translate(0 -14.223)"
          />
          <Path
            data-name="Path 1174"
            d="M39.969 26.736c4.6.274 8.222 2.152 10.485 6.138 2.442 4.3 2.42 8.74-.538 12.762-2.644 3.594-5.649 6.924-8.533 10.34a1.645 1.645 0 01-2.779-.008c-3.037-3.625-6.248-7.133-8.97-10.985-4.141-5.86-.736-15.135 6.154-17.333 1.353-.432 2.785-.616 4.181-.914m.012 27.94c1.2-1.417 2.246-2.612 3.243-3.849 1.965-2.436 4.208-4.714 5.779-7.385a9.683 9.683 0 00-2.893-12.625 10.428 10.428 0 00-13.311.9 9.77 9.77 0 00-1.225 12.691c2.566 3.514 5.506 6.755 8.406 10.27"
            transform="translate(-10.209 -9.806)"
          />
          <Path
            data-name="Path 1175"
            d="M32.39 0a13.332 13.332 0 012.465 1.432q11.246 10.46 22.422 21c.539.505 1.137 1.06.389 1.8-.774.771-1.3.043-1.8-.432Q44.943 13.557 34.032 3.3c-1.513-1.42-1.661-1.4-3.151-.014q-10.959 10.2-21.925 20.4c-.188.175-.361.453-.577.495A8.45 8.45 0 017 24.238c.056-.5-.075-1.179.2-1.456 1.667-1.677 3.426-3.264 5.157-4.877Q21.111 9.75 29.882 1.616A17.586 17.586 0 0132.39 0"
            transform="translate(-2.567)"
          />
          <Path
            data-name="Path 1176"
            d="M40.693 11.248c-3.02 2.805-5.907 5.512-8.831 8.177-.586.534-1.25 1.678-2.139.78-1.015-1.026.271-1.6.874-2.173q4.138-3.932 8.344-7.794c1.418-1.3 2.05-1.313 3.44-.033 2.912 2.684 5.812 5.383 8.638 8.157.362.355.249 1.194.356 1.808-.577-.137-1.323-.091-1.7-.441-2.991-2.746-5.912-5.567-8.977-8.481"
            transform="translate(-10.763 -3.394)"
          />
          <Path
            data-name="Path 1177"
            d="M70.113 3.889H67.4a30.459 30.459 0 01-.038 3.611c-.07.583-.523 1.518-.923 1.586-1.03.174-.959-.773-.961-1.494 0-1.132-.012-2.263.006-3.395a3.9 3.9 0 01.14-1.218C66 1.9 67.805 1.45 70.089 1.824a1.993 1.993 0 011.936 2.024c.034 2.932.054 5.865-.028 8.794-.013.468-.591.921-.908 1.38-.324-.486-.907-.959-.929-1.458-.1-2.31-.046-4.627-.047-6.941V3.889"
            transform="translate(-24.014 -.621)"
          />
          <Path
            data-name="Path 1178"
            d="M43.869 48.188a5.392 5.392 0 11.121-10.781 5.391 5.391 0 11-.121 10.781m.078-8.785a3.385 3.385 0 10-.055 6.768 3.385 3.385 0 10.055-6.768"
            transform="translate(-14.095 -13.72)"
          />
        </G>
      </G>
    </Svg>
  )
}


export function RELIABLENONPROFITS(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={54.601}
      height={54.366}
      viewBox="0 0 54.601 54.366"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 310"
            fill="none"
            d="M0 0H54.601V54.366H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 594">
        <G
          data-name="Group 593"
          transform="translate(4) translate(-4)"
          clipPath="url(#a)"
          fill="#fa7c53"
        >
          <Path
            data-name="Path 1136"
            d="M36.25 39.5c-2.266 1.935-4.45 3.783-6.606 5.662a1.419 1.419 0 00-.509.917c.1 5.8.245 11.6.384 17.608h1.935c5.962 0 11.923.024 17.885-.022a1.936 1.936 0 012.12 1.377c.8 2 1.764 3.933 2.6 5.921a13.432 13.432 0 01.493 2.159H1.684c-1.862 0-1.941-.119-1.2-1.786.95-2.142 1.949-4.263 2.838-6.429a1.766 1.766 0 011.921-1.236c3.8.042 7.605-.015 11.407.037 1.043.014 1.489-.336 1.388-1.366a.44.44 0 01.006-.141 10.3 10.3 0 00-2.957-10.079 25.382 25.382 0 01-2.338-3.168c-1.115-1.565-1.113-2.416 0-3.947.663-.91 1.4-1.771 2.007-2.716 1.448-2.254 3.23-3.819 6.083-3.167-.333-1.223-.992-2.391-.843-3.446a5.307 5.307 0 011.742-3 3.677 3.677 0 014.876.454c1.491 1.49 1.5 3.463.03 5.732 1.415.277 2.767-.424 6.408-3.328-.466-1.509-.952-3.011-1.387-4.528-.33-1.149-.02-1.878 1.318-2.059a10.3 10.3 0 005.718-2.8 1.2 1.2 0 011.925-.029 11.127 11.127 0 005.98 2.906c.85.138 1.343.451 1.178 1.491-.773 4.868-3.487 8.411-7.482 11.073a1.565 1.565 0 01-1.37-.087c-.91-.56-1.726-1.274-2.68-2M22.936 65.535c-.142.886-.207 1.638-.4 2.357-.1.363-.411.934-.654.948a12.282 12.282 0 01-3.739-.146c-.307-.08-.25-1.568-.354-2.409-.027-.221-.03-.446-.052-.8-4.092 0-8.116-.008-12.14.019a1 1 0 00-.758.439c-.863 1.848-1.672 3.721-2.539 5.68h50.11c-.747-1.7-1.5-3.244-2.106-4.848a1.74 1.74 0 00-1.94-1.323c-5.678.059-11.358.026-17.037.031-.453 0-.905.044-1.342.066-.26 3.61-.259 3.591-3.581 3.416-.791-.042-1.213-.315-1.305-1.128-.088-.774-.255-1.539-.386-2.3zm11.241-28.5a7.219 7.219 0 00-.936.594c-3 2.705-6.482 3.424-10.482 3.227-5.341-.263-4.215-.627-7.46 3.692-2.071 2.757-2.108 1.987-.068 4.818 1.02 1.415 2.052 2.822 3.079 4.232l.464-.236a17.368 17.368 0 00-.761-2.432c-.52-1.1-1.242-2.1-1.767-3.2a1.591 1.591 0 01-.015-1.369 19.636 19.636 0 012.57-2.6c.74-.621 1.315-.287 1.5.627a4.836 4.836 0 01.027 1.123l-.8 20.8c-.01.266 0 .534 0 .886l1.348-.067c.665-4.2 1.287-8.328 2-12.435.1-.56.667-1.039 1.018-1.555a5.19 5.19 0 01.906 1.56c.645 3.789 1.215 7.59 1.782 11.391.147.988.516 1.452 1.572.914 0-.249.008-.482 0-.714-.261-6.7-.506-13.4-.8-20.1a2.65 2.65 0 011.112-2.391c2.21-1.8 4.353-3.693 6.583-5.6l-.872-1.167m5.5-9.023L33.5 31.04a13.5 13.5 0 006.164 8.825 13.639 13.639 0 006.2-8.845l-6.192-3.007m-15.879 5.751a2.2 2.2 0 00-2.108 2.324 2.174 2.174 0 002.188 2.1 2.211 2.211 0 00-.08-4.42m-.523 29.709c1.257.122 1.333-.388.477-3.15l-.477 3.15"
            transform="translate(-.034 -18.76)"
          />
          <Path
            data-name="Path 1137"
            d="M8.639 1.882c.009-.008.26-.211.492-.433a4.289 4.289 0 015.727-.612 4.73 4.73 0 011.186 6.188 27.277 27.277 0 01-2.744 3.189c-1.263 1.387-2.576 2.729-3.829 4.124-.7.784-1.3.921-2.086.074-1.974-2.137-4.034-4.193-5.985-6.347a4.812 4.812 0 01-.791-5.724A4.111 4.111 0 014.928.086a19.565 19.565 0 013.711 1.8m-.347 10.9a2.186 2.186 0 00.392-.219c1.039-1.084 2.09-2.157 3.1-3.263a33.281 33.281 0 002.762-3.181 2.781 2.781 0 00-.73-3.763 2.421 2.421 0 00-3.41.326C8.4 4.511 8.4 4.511 6.362 2.668 4.6 1.076 2.286 1.759 1.961 4.109a4.009 4.009 0 00.821 2.8c1.709 2.047 3.639 3.909 5.51 5.872"
            transform="translate(0 .001)"
          />
          <Path
            data-name="Path 1138"
            d="M159.435 112.983c1.139-.96 2.279-1.91 3.907-1.483a3.978 3.978 0 012 6.356c-1.565 1.867-3.306 3.587-4.977 5.366a1.086 1.086 0 01-1.807-.01c-1.691-1.823-3.438-3.6-5.07-5.472a4.03 4.03 0 01.246-5.166 3.455 3.455 0 015.047-.152c.215.175.42.362.649.56m.05 8.616c1.507-1.626 2.927-3.12 4.3-4.654a2.115 2.115 0 00.1-3.135c-.885-.84-1.985-.692-3.053.411-1.319 1.363-1.375 1.365-2.639.068-1.163-1.192-2.16-1.388-3.053-.6a2.328 2.328 0 00.089 3.389c1.355 1.492 2.762 2.936 4.259 4.519"
            transform="translate(-111.654 -81.467)"
          />
        </G>
      </G>
    </Svg>
  )
}

export function WELFAREICON(props) {
  return (
    <Svg
      data-name="Group 600"
      xmlns="http://www.w3.org/2000/svg"
      width={50.299}
      height={51.34}
      viewBox="0 0 50.299 51.34"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 312"
            fill="none"
            d="M0 0H50.299V51.34H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 599" clipPath="url(#a)" fill="#fa7c53">
        <Path
          data-name="Path 1139"
          d="M.1 126.369c0-2.687.185-5.369-.051-8.014a6.827 6.827 0 012.717-6.606c1.764-1.363 3.211-3.164 5.049-4.4a9.418 9.418 0 014.349-1.366c2.7-.217 5.424-.105 8.138-.07a3.3 3.3 0 013.311 3.271 3.394 3.394 0 01-3.379 3.231c-1.2.03-2.411.006-3.728.006a2.194 2.194 0 002.169 1.642 8.5 8.5 0 005.656-1.609c2.944-2.027 6.028-3.851 9.063-5.744 2.031-1.267 3.892-1.009 5 .661 1.158 1.752.637 3.786-1.308 5.132q-5.512 3.817-11.017 7.643a8.1 8.1 0 01-4.849 1.489c-3.231-.028-6.463.015-9.694-.015a6.018 6.018 0 00-4.176 1.4c-.982.839-2.13 1.492-3.06 2.38-1.2 1.149-2.554 1.219-4.183.968m1.6-1.249c.621-.38.989-.567 1.314-.811 1.137-.853 2.287-1.693 3.382-2.6a7.335 7.335 0 015-1.736c3.141.054 6.286-.049 9.426.039a7.328 7.328 0 004.7-1.449c2.676-1.934 5.4-3.807 8.1-5.7.848-.591 1.726-1.138 2.573-1.73 1.187-.83 1.5-1.915.857-2.851s-1.51-1-2.821-.179q-5.584 3.5-11.164 7a2.4 2.4 0 01-1.022.511c-2.741.063-5.722.753-7.307-2.545-.048-.1-.176-.164-.288-.263l-2.551 1.872-.829-1.168a7.208 7.208 0 016.948-2.7 10.673 10.673 0 001.806.01c1.349-.031 2.154-.694 2.117-1.726-.035-.978-.815-1.588-2.1-1.595-2.238-.013-4.478-.042-6.715.007a8.9 8.9 0 00-6.482 2.726c-1.407 1.458-2.884 2.846-4.292 4.3a2.013 2.013 0 00-.619 1.179c-.052 3.018-.028 6.037-.028 9.4"
          transform="translate(0 -80.696)"
        />
        <Path
          data-name="Path 1140"
          d="M87.011 11.566c0 3.841.015 7.6-.024 11.349A1.809 1.809 0 0186.454 24q-2.474 2.558-5.014 5.053a9.892 9.892 0 01-7.211 2.974c-2.37-.005-4.739.033-7.108-.006-2.177-.035-3.6-1.37-3.573-3.261.024-1.843 1.5-3.156 3.646-3.206 1.107-.026 2.216 0 3.433 0a2.164 2.164 0 00-2.141-1.68 8.478 8.478 0 00-5.545 1.553c-3.04 2.041-6.207 3.889-9.31 5.835a3.547 3.547 0 01-3.546.45 3.47 3.47 0 01-.809-5.654 5.293 5.293 0 01.514-.392c3.78-2.618 7.57-5.222 11.339-7.856a8 8 0 014.848-1.473c3.274.043 6.549-.019 9.822.027a5.556 5.556 0 003.594-1.191c1.164-.891 2.427-1.665 3.512-2.642a4.5 4.5 0 014.106-.964m-1.551 1.31c-.687.415-1.091.62-1.453.884a152.866 152.866 0 00-3.732 2.778 6.633 6.633 0 01-4.314 1.423c-3.357-.042-6.719-.107-10.071.037a8.644 8.644 0 00-3.617 1.081c-1.412.768-2.621 1.9-3.959 2.816-2.384 1.626-4.8 3.2-7.2 4.805-1.292.865-1.664 1.927-1.046 2.907.594.943 1.569 1 2.935.15q5.48-3.42 10.953-6.849a2.644 2.644 0 011.139-.558c2.779-.053 5.814-.746 7.376 2.642.028.06.14.081.241.135l2.546-1.828.854 1.219c-1.882 1.924-3.93 3.15-6.678 2.7a15.628 15.628 0 00-2.45-.016c-1.078 0-1.757.481-1.753 1.6S65.925 30.4 67 30.39c2.669-.016 5.357.159 8-.114a8.9 8.9 0 004.343-1.66 64.441 64.441 0 005.7-5.436 1.412 1.412 0 00.407-.884c.03-3.013.018-6.027.018-9.42"
          transform="translate(-36.716 -8.731)"
        />
        <Path
          data-name="Path 1141"
          d="M8.229 15.616C5.709 12.657 3.216 9.88.907 6.957a4 4 0 01.531-5.316C3.448-.4 5.236-.538 7.471 1.229a1.067 1.067 0 001.571.017c1.7-1.4 4.122-1.588 5.247-.464 2.383 2.38 2.784 4.588 1.037 6.684-2.254 2.7-4.619 5.316-7.1 8.151m.042-2.631c1.861-2.1 3.716-4.18 5.551-6.278a2.8 2.8 0 00.35-3.762A2.81 2.81 0 0010.33 2.4c-1.538 1.215-2.7 1.153-4.2-.056a2.735 2.735 0 00-3.63.498 2.626 2.626 0 00.06 3.649c1.855 2.19 3.788 4.314 5.714 6.494"
          transform="translate(-.093)"
        />
        <Path
          data-name="Path 1142"
          d="M151.814 166.788c-1.323-1.473-2.54-2.8-3.72-4.151-1.014-1.164-1.968-2.38-2.978-3.548-1.667-1.926-1.865-4.29-.473-6.012a4.578 4.578 0 016.067-.776 1.659 1.659 0 002.157-.015 4.32 4.32 0 014.982-.1 4.054 4.054 0 011.983 4.07 3.454 3.454 0 01-.607 1.8c-2.4 2.91-4.874 5.759-7.411 8.731m-.028-2.476c2.021-2.347 3.992-4.559 5.869-6.848a2.423 2.423 0 00-.04-3.317 2.675 2.675 0 00-3.6-.66c-1.59 1.213-2.843 1.365-4.45.014a2.679 2.679 0 00-3.523.524 2.593 2.593 0 00-.019 3.543c1.856 2.254 3.789 4.442 5.766 6.745"
          transform="translate(-109.558 -115.449)"
        />
        <Path
          data-name="Path 1143"
          d="M181.1 115.986h1.643v1.588l-1.444.186-.21 1.471h-1.453l-.108-1.477-1.469-.178v-1.5l1.524-.092-.033-.036.093 1.618h1.49v-1.611z"
          transform="translate(-135.738 -88.392)"
        />
        <Path
          data-name="Path 1144"
          d="M13.575 82.631c.032-.468.064-.936.1-1.518l1.473-.07.208 1.5 1.444.171v1.447h-1.433l.022.023-.25-1.495-1.6-.093.037.032"
          transform="translate(-10.32 -61.78)"
        />
        <Path
          data-name="Path 1145"
          d="M90.94 197.7l-1.7-.137v-1.768l1.7-.152-.031-.024v2.105z"
          transform="translate(-68.027 -149.121)"
        />
        <Path
          data-name="Path 1146"
          d="M15.4 94.148l-.169 1.952h-1.509l-.118-1.962-.023.03h1.84z"
          transform="translate(-10.353 -71.764)"
        />
        <Path
          data-name="Path 1147"
          d="M42.586 195.6l-.111 1.938h-1.527l-.152-1.939-.024.029h1.84z"
          transform="translate(-31.08 -149.108)"
        />
        <Path
          data-name="Path 1148"
          d="M102.794 195.608l1.448.115.156 1.761-1.605.178.032.037v-2.127z"
          transform="translate(-78.36 -149.086)"
        />
        <Path
          data-name="Path 1149"
          d="M157.186 2.464V.7h1.507v1.766l.039-.036h-1.584z"
          transform="translate(-119.796 -.535)"
        />
        <Path
          data-name="Path 1150"
          d="M163.608 8.007h1.608v1.585l-1.621-.08.053.048V7.971l-.039.036"
          transform="translate(-124.711 -6.076)"
        />
        <Path
          data-name="Path 1151"
          d="M158.681 14.451v1.679h-1.491v-1.68l-.042.048h1.585z"
          transform="translate(-119.796 -11.015)"
        />
        <Path
          data-name="Path 1152"
          d="M40.762 184.41l.143-1.491h1.51l.136 1.491.036-.033h-1.86l.035.033"
          transform="translate(-31.047 -139.441)"
        />
        <Path
          data-name="Path 1153"
          d="M36.19 190.608l-1.461.092v-1.616h1.461l-.035-.033q0 .793.01 1.586z"
          transform="translate(-26.474 -144.117)"
        />
        <Path
          data-name="Path 1154"
          d="M48.4 189.085h1.473v1.524H48.4l.024.029.01-1.586z"
          transform="translate(-36.897 -144.117)"
        />
        <Path
          data-name="Path 1155"
          d="M95.946 191l-.139-1.47h1.575l.086 1.473.032-.037-1.585.011z"
          transform="translate(-73.035 -144.481)"
        />
        <Path
          data-name="Path 1156"
          d="M184.366 111.363v-1.478h1.586l-.07 1.476.033-.027-1.583-.007z"
          transform="translate(-140.519 -83.767)"
        />
        <Path
          data-name="Path 1157"
          d="M8.955 89.147l-1.473.132v-1.657h1.476l-.037-.032q0 .794.01 1.587l.023-.03"
          transform="translate(-5.704 -66.771)"
        />
        <Path
          data-name="Path 1158"
          d="M152.331 9.509l-1.556.082V8h1.552l-.038-.035v1.592z"
          transform="translate(-114.938 -6.075)"
        />
        <Path
          data-name="Path 1159"
          d="M97.612 204.366v1.47H96c.033-.5.064-.985.1-1.468l-.031.024 1.583.011z"
          transform="translate(-73.179 -155.791)"
        />
      </G>
    </Svg>
  )
}

export function SUPPORTICON(props) {
  return (
    <Svg
      data-name="Group 604"
      xmlns="http://www.w3.org/2000/svg"
      width={45.758}
      height={50.545}
      viewBox="0 0 45.758 50.545"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 314"
            fill="none"
            d="M0 0H45.365V50.545H0z"
          />
        </ClipPath>
        <ClipPath id="b">
          <Path
            data-name="Rectangle 325"
            fill="#fa7c53"
            d="M0 0H22.798V22.821H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Mask Group 1" clipPath="url(#a)" fill="#fa7c53">
        <Path
          data-name="Path 1160"
          d="M16.673 60.926V84.855c0 3.648-1.653 5.31-5.264 5.334-1.119.007-2.238.022-3.355-.005-3.016-.072-4.764-1.8-4.8-4.8-.04-3.03-.032-6.06 0-9.09a1.757 1.757 0 00-1.02-1.879 4.209 4.209 0 01-2.2-3.946C0 66.826-.022 63.189.036 59.554c.041-2.578 1.986-4.329 4.819-4.354 4.567-.041 9.135-.011 13.7-.01 2.843 0 5.686-.022 8.529.01 1.776.02 2.861.8 3.165 2.167a2.81 2.81 0 01-2.879 3.544c-2.982.05-5.966.014-8.948.015h-1.749M14.852 73.1c0-4.057.05-8.115-.028-12.171-.027-1.385.48-1.774 1.791-1.749 3.5.064 6.995.067 10.489-.031.5-.014.979-.717 1.467-1.1-.462-.346-.922-.991-1.388-.994q-11.259-.092-22.519-.026a2.531 2.531 0 00-2.781 2.681c-.078 3.635-.046 7.274-.009 10.91a2.4 2.4 0 001.87 2.48c1.053.281 1.342.93 1.328 1.963-.046 3.4-.033 6.809-.011 10.213.014 2.087 1.02 3.095 3.076 3.134 1.119.021 2.238.012 3.357 0 2.425-.02 3.351-.958 3.356-3.421.008-3.964 0-7.928 0-11.892"
          transform="translate(0 -39.651)"
        />
        <Path
          data-name="Path 1161"
          d="M24.657 7a6.891 6.891 0 11-13.782-.147A6.892 6.892 0 1124.657 7m-6.838-5.164a5.071 5.071 0 00-5.172 5.084 5.194 5.194 0 005.064 5.106 5.236 5.236 0 005.178-5.137 5.069 5.069 0 00-5.07-5.052"
          transform="translate(-7.815 -.001)"
        />
      </G>
      <G data-name="Group 635">
        <G
          data-name="Group 634"
          clipPath="url(#b)"
          fill="#fa7c53"
          transform="translate(22.96 25.718)"
        >
          <Path
            data-name="Path 1192"
            d="M22.794 11.423A11.4 11.4 0 1111.409 0a11.385 11.385 0 0111.385 11.423m-11-9.895a9.9 9.9 0 109.521 10.261A9.916 9.916 0 0011.79 1.528"
          />
          <Path
            data-name="Path 1193"
            d="M89.193 39.029c0 1.036.009 2.071 0 3.107a.982.982 0 00.559.967c.544.292 1.074.608 1.609.915 1.019.583 2.026 1.189 3.067 1.733a1.041 1.041 0 00.871.01.888.888 0 00.267-.766c-.04-.221-.313-.447-.537-.581a107.882 107.882 0 00-3.768-2.188.986.986 0 01-.6-1.018c.034-1.672.015-3.346.012-5.018 0-.755-.22-1.074-.724-1.083s-.748.313-.751 1.055v2.868"
            transform="translate(-78.511 -30.903)"
          />
          <Path
            data-name="Path 1194"
            d="M89.192 39.029v-2.868c0-.742.237-1.064.751-1.055s.722.328.724 1.083c0 1.673.022 3.346-.012 5.018a.985.985 0 00.6 1.018c1.274.7 2.523 1.44 3.768 2.188.224.135.5.36.537.581a.888.888 0 01-.268.766 1.041 1.041 0 01-.871-.01c-1.04-.543-2.047-1.15-3.067-1.733-.536-.306-1.066-.623-1.609-.915a.982.982 0 01-.559-.967c.013-1.035 0-2.071 0-3.107"
            transform="translate(-78.51 -30.903)"
          />
        </G>
      </G>
    </Svg>
  )
}

export function NONCOMMERCIALACTIVITIES(props) {
  return (
    <Svg
      data-name="Group 633"
      xmlns="http://www.w3.org/2000/svg"
      width={48.931}
      height={48.743}
      viewBox="0 0 48.931 48.743"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 324"
            fill="#fa7c53"
            d="M0 0H48.931V48.743H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 632" clipPath="url(#a)" fill="#fa7c53">
        <Path
          data-name="Path 1181"
          d="M67.977 105.307c-5.452 0-10.9-.026-16.356.02-1.214.01-1.672-.347-1.659-1.624q.085-8.7 0-17.394c-.01-1.222.372-1.683 1.634-1.68q16.356.052 32.712 0c1.18 0 1.6.4 1.592 1.586q-.061 8.761.006 17.524c.011 1.213-.418 1.589-1.578 1.581-5.452-.035-10.9-.016-16.356-.015m-16.385-1.558H84.3V86.3H51.592z"
          transform="translate(-36.98 -62.64)"
        />
        <Path
          data-name="Path 1182"
          d="M35.915 37.9a3.218 3.218 0 011.155.412c.2.193.155.643.218.98a9.435 9.435 0 01-2.237.209c-.263-.033-.613-.781-.622-1.209-.057-2.727-.029-5.456-.03-8.184v-2.636H1.65v18.286h1.23c2.425 0 4.851-.036 7.274.035.428.013.844.478 1.265.734-.393.263-.781.744-1.179.753-2.987.064-5.975.03-8.963.037C.338 47.32 0 46.865 0 45.943q.032-9.354 0-18.707c-.006-1.106.465-1.411 1.488-1.41q16.434.03 32.868 0c1.154 0 1.6.39 1.582 1.6-.065 3.461-.023 6.925-.023 10.478"
          transform="translate(0 -19.116)"
        />
        <Path
          data-name="Path 1183"
          d="M12.04 141.96c-2.519.078-5.268.134-7.371-2.22-2.039-2.281-1.546-5.071-1.695-7.74-.206.021-.3 0-.362.042-.5.312-.936 1.2-1.564.39-.174-.224.178-1.09.516-1.443 2.557-2.668 1.854-2.633 4.524-.025.155.151.4.3.427.473a6.7 6.7 0 01.013 1.159 4.031 4.031 0 01-1.025-.1c-.252-.091-.438-.364-.7-.594-1.1 5.933 1.155 9.384 7.225 8.381-.1-.634-.489-1.62-.24-1.823.8-.652 1.275.288 1.757.764 2.387 2.352 2.1 1.8.074 3.913a.7.7 0 01-.09.093c-.54.387-.9 1.48-1.724.753-.264-.233.117-1.2.23-2.021"
          transform="translate(-.742 -95.482)"
        />
        <Path
          data-name="Path 1184"
          d="M135.722 2.43c2.53-.014 5.292-.045 7.361 2.321 2.011 2.3 1.471 5.086 1.6 7.747.185-.01.285.015.342-.024.531-.354 1.022-1.237 1.689-.43.176.213-.246 1.17-.627 1.555-2.54 2.569-1.888 2.39-4.371-.016-.155-.15-.382-.286-.434-.469a7.8 7.8 0 01-.167-1.159 5.87 5.87 0 011.16.068c.216.054.38.317.591.507 1.024-5.455-.684-9.254-7.405-8.4a1.523 1.523 0 00.176.421c.4.455 1.01.974.3 1.475-.255.179-1.119-.169-1.468-.516-2.644-2.62-2.64-1.96-.087-4.4a4.953 4.953 0 011.573-.67l-.233 1.99"
          transform="translate(-98.049 -.326)"
        />
        <Path
          data-name="Path 1185"
          d="M57.788 45.832a5.335 5.335 0 01-10.668.134 5.334 5.334 0 0110.668-.134m-9.114 0a3.795 3.795 0 103.79-3.779 3.742 3.742 0 00-3.79 3.779"
          transform="translate(-34.876 -30.029)"
        />
        <Path
          data-name="Path 1186"
          d="M99.9 49.615a2.578 2.578 0 012.559 2.686 2.671 2.671 0 01-2.674 2.6 2.794 2.794 0 01-2.61-2.718 2.729 2.729 0 012.725-2.57"
          transform="translate(-71.929 -36.723)"
        />
        <Path
          data-name="Path 1187"
          d="M17.931 52.219a2.566 2.566 0 012.646-2.589 2.658 2.658 0 012.606 2.659 2.753 2.753 0 01-2.676 2.632 2.69 2.69 0 01-2.577-2.7"
          transform="translate(-13.272 -36.735)"
        />
        <Path
          data-name="Path 1188"
          d="M12.809 4.3l-.975-1.03 1.127-1.208-1.29-.871L12.833 0l1.15 1.021 1.059-.96 1.041.992-.96 1.073.91 1.084-.933 1.04-1.122-.95-1.168 1"
          transform="translate(-8.639 -.001)"
        />
        <Path
          data-name="Path 1189"
          d="M107.8 107.581a5.338 5.338 0 11-10.674-.042 5.337 5.337 0 0110.674.042m-1.523.057a3.8 3.8 0 10-3.815 3.784 3.808 3.808 0 003.815-3.784"
          transform="translate(-71.887 -75.695)"
        />
        <Path
          data-name="Path 1190"
          d="M152.558 114.073a2.68 2.68 0 01-2.634 2.649 2.806 2.806 0 01-2.618-2.572 2.731 2.731 0 012.6-2.706 2.676 2.676 0 012.651 2.629"
          transform="translate(-109.031 -82.488)"
        />
        <Path
          data-name="Path 1191"
          d="M70.495 111.422a2.769 2.769 0 012.691 2.625 2.8 2.8 0 01-2.661 2.663 2.731 2.731 0 01-2.589-2.564 2.7 2.7 0 012.559-2.724"
          transform="translate(-50.283 -82.471)"
        />
      </G>
    </Svg>
  )
}
// HAPPENING TERMS CONDITION ICONS ENDS


export function NextIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25.263}
      height={15.411}
      viewBox="0 0 25.263 15.411"
      {...props}
    >
      <G
        transform="translate(.5 .706)"
        fill="none"
        stroke="#2a2a2a"
        strokeLinecap="round"
        strokeWidth={1}
      >
        <Path data-name="Line 2" transform="translate(0 7)" d="M0 0L24.058 0" />
        <Path data-name="Line 3" transform="translate(16.058 7)" d="M8 0L0 7" />
        <Path data-name="Line 4" transform="translate(16.058)" d="M8 7L0 0" />
      </G>
    </Svg>
  )
}

export function HappeningLocationIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={51.073}
      height={45.024}
      viewBox="0 0 51.073 45.024"
      {...props}
    >
      <Path
        data-name="Path 1683"
        d="M-194.737 421.445q2.583-7.974 5.17-15.948c1.279-3.914 2.634-7.8 3.852-11.737a1.554 1.554 0 011.87-1.305 42.676 42.676 0 004.784 0 1.705 1.705 0 012.013 1.249 19.815 19.815 0 00.988 2.065c-1.96 0-3.759.05-5.552-.021a1.414 1.414 0 00-1.691 1.179c-.716 2.419-1.6 4.786-2.326 7.2a3.322 3.322 0 00.276 2.075c-2.85 3.4-3.35 7.844-5.012 11.967h42.206c-.549-1.694-1.135-3.339-1.612-5.015-.625-2.2-1.4-4.277-3.526-5.689 1.309-.879 1.083-1.872.653-3.042-.9-2.449-1.692-4.942-2.442-7.443a1.481 1.481 0 00-1.779-1.242c-1.759.1-3.528.027-5.5.027a31.425 31.425 0 011.455-2.819 1.518 1.518 0 011.11-.449c1.772-.047 3.549.047 5.317-.047a1.5 1.5 0 011.769 1.258q4.2 12.91 8.5 25.789a9.612 9.612 0 00.55 1.145v.8z"
        transform="translate(194.737 -376.42)"
        fill="#000000"
      />
      <Path
        data-name="Path 1684"
        d="M-121.549 358.1c-2.44-4.971-5.135-9.835-7.243-14.944a7.692 7.692 0 015.274-10.3 7.862 7.862 0 019.955 5.916 7.14 7.14 0 01-.173 4.177c-2.321 5.117-4.905 10.114-7.394 15.154zm.274-22.28a4.78 4.78 0 00-4.825 4.78 4.8 4.8 0 004.733 4.754 4.808 4.808 0 004.826-4.8 4.785 4.785 0 00-4.734-4.737z"
        transform="translate(146.855 -332.532)"
        fill="#35208e"
      />
      <Path
        data-name="Path 1685"
        d="M-151.768 448.1l2.874.339v3.34l-3.725-.535z"
        transform="translate(163.884 -417.192)"
        fill="#35208e"
      />
      <Path
        data-name="Path 1686"
        d="M-127.636 446.053l2.885-.887 1.23 3.023-3.427 1.057z"
        transform="translate(145.584 -415.039)"
        fill="#35208e"
      />
      <Path
        data-name="Path 1687"
        d="M-105.016 438.083l-1.62-2.871 2.969-1.754 1.5 2.906z"
        transform="translate(130.201 -406.463)"
        fill="#35208e"
      />
      <Path
        data-name="Path 1688"
        d="M-57.645 426.281l3.591 1.29-1.471 2.913-2.712-1.008z"
        transform="translate(94.747 -401.206)"
        fill="#35208e"
      />
      <Path
        data-name="Path 1689"
        d="M-82.365 429.378l-.956-3.079 3.6-.8.252 3.273z"
        transform="translate(113.122 -400.631)"
        fill="#35208e"
      />
    </Svg>
  )
}

export function OnlineHappeningIcon(props) {
  return (
    <Svg
      data-name="Group 37"
      xmlns="http://www.w3.org/2000/svg"
      width={45.642}
      height={47.019}
      viewBox="0 0 45.642 47.019"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 35"
            fill="none"
            d="M0 0H45.642V47.019H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 36" clipPath="url(#a)">
        <Path
          data-name="Path 28"
          d="M166.319 14.05a16.369 16.369 0 01-1.051 2.432 5.447 5.447 0 01-5.233 2.657 3.137 3.137 0 00-2.848 1.312 33.426 33.426 0 01-4.106 3.754 2.121 2.121 0 01-2.761.133 2.5 2.5 0 01-.851-2.814c.191-.748.366-1.5.525-2.157a16.282 16.282 0 01-3.214-.8 5.664 5.664 0 01-3.357-5.031 67.48 67.48 0 01.007-7.9 5.815 5.815 0 014.3-5.418 5.354 5.354 0 00.489-.218h13.221a6.2 6.2 0 013.737 2.51 23.609 23.609 0 011.142 2.555zm-13.629 6.774a3.065 3.065 0 00.431-.332c1.006-1.105 2.046-2.183 2.99-3.342a2.187 2.187 0 011.947-.973c.732.045 1.468.012 2.2.009a3.094 3.094 0 003.233-3.371q.017-3.226 0-6.453a3.1 3.1 0 00-3.157-3.405q-5.467-.08-10.936 0a2.959 2.959 0 00-3.107 3.012 79.514 79.514 0 00.027 7.421 2.907 2.907 0 003.017 2.8c.577.006 1.154 0 1.731 0 1.259.017 1.87.682 1.809 2-.039.864-.122 1.725-.189 2.635"
          transform="translate(-120.677 .001)"
          fill="#5b4dbc"
        />
        <Path
          data-name="Path 29"
          d="M24.074 90.869v3.443c.988 0 1.95-.006 2.912 0 .886.007 1.172.3 1.184 1.215.005.381 0 .762 0 1.144-.008 1.051-.28 1.352-1.316 1.354q-6.53.013-13.061 0c-.971 0-1.3-.37-1.322-1.4-.041-2.175.045-2.4 2.133-2.322.653.026 1.307 0 2.079 0v-3.434H2.267C.624 90.867 0 90.212 0 88.492V63.253c0-1.486.672-2.225 2.109-2.228q8.773-.021 17.545 0c.127 0 .253.02.428.035v3.374H3.351v19.711h33.987v-1.7-6.943a2.66 2.66 0 012.416-2.582h.972v15.429c0 1.85-.644 2.522-2.407 2.522H24.074m-3.743-2.107a1.269 1.269 0 001.232-1.224 1.243 1.243 0 00-1.263-1.259 1.218 1.218 0 00-1.17 1.253 1.179 1.179 0 001.2 1.227"
          transform="translate(0 -51.013)"
          fill="#161615"
        />
        <Path
          data-name="Path 30"
          d="M185.387 37.915c-1.416 0-2.832.027-4.247-.008-1.287-.032-2.01-1.13-1.354-2.112a1.836 1.836 0 011.294-.724c2.856-.065 5.715-.049 8.572-.025a1.379 1.379 0 011.528 1.393 1.42 1.42 0 01-1.546 1.468c-1.415.028-2.831.007-4.247.007"
          transform="translate(-151.185 -29.283)"
          fill="#5b4dbc"
          opacity={0.691}
        />
        <Path
          data-name="Path 31"
          d="M185.324 66.45h-4.085c-1.071 0-1.694-.5-1.717-1.368s.619-1.42 1.664-1.422q4.163-.011 8.326 0c1.067 0 1.667.528 1.659 1.413s-.594 1.374-1.684 1.378h-4.163"
          transform="translate(-151.169 -53.216)"
          fill="#5b4dbc"
          opacity={0.691}
        />
      </G>
      <G transform="rotate(2 -8958.62 -46395.03)" fill="#fff">
        <G data-name="Subtraction 2">
          <Path
            d="M11.926 5H1.074c.182-.96.697-1.848 1.495-2.558C3.613 1.512 5.009 1 6.499 1c1.492 0 2.888.512 3.932 1.442.798.71 1.313 1.598 1.495 2.558z"
            transform="translate(1632.96 -317.112)"
          />
          <Path
            d="M10.465 4a3.926 3.926 0 00-.699-.811C8.906 2.422 7.746 2 6.5 2c-1.245 0-2.405.422-3.266 1.188-.278.247-.512.52-.699.812h7.93m2.53 2H.006A5.291 5.291 0 010 5.786C0 4.24.676 2.787 1.904 1.695 3.132.602 4.764 0 6.5 0c1.736 0 3.368.602 4.596 1.695C12.324 2.787 13 4.24 13 5.785c0 .071-.001.143-.004.215z"
            fill="#2a2a2a"
            transform="translate(1632.96 -317.112)"
          />
        </G>
        <G
          data-name="Ellipse 14"
          transform="translate(1634.96 -323.112)"
          stroke="#2a2a2a"
          strokeWidth={2}
        >
          <Circle cx={4} cy={4} r={4} stroke="none" />
          <Circle cx={4} cy={4} r={3} fill="none" />
        </G>
        <Path
          data-name="Rectangle 9"
          transform="translate(1632.135 -313.28)"
          d="M0 0H14V2.406H0z"
        />
      </G>
    </Svg>
  )
}


export function LocationIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16.13}
      height={27.159}
      viewBox="0 0 16.13 27.159"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 609"
            fill="#35208e"
            d="M0 0H16.13V27.159H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 1181" clipPath="url(#a)">
        <Path
          data-name="Path 1682"
          d="M16.13 6.439v2.394a22.087 22.087 0 01-.755 2.308q-3.569 7.949-7.194 15.874c-.021.046-.105.064-.245.144C5.434 20.872 1.87 15.074 0 8.552V6.721a18.743 18.743 0 011.12-3.057A7.158 7.158 0 016.993.062c3.306-.321 6.123.577 7.972 3.484a16.505 16.505 0 011.165 2.893m-8.088 5.517a3.885 3.885 0 004.01-3.906A3.978 3.978 0 004.1 7.964a3.928 3.928 0 003.945 3.992"
          fill="#35208e"
        />
      </G>
    </Svg>
  )
}

export function CalenderIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.335}
      height={16.538}
      viewBox="0 0 15.335 16.538"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 227"
            fill="none"
            d="M0 0H15.335V16.538H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 285">
        <G
          data-name="Group 284"
          transform="translate(0 1) translate(0 -1)"
          clipPath="url(#a)"
          fill="#161615"
        >
          <Path
            data-name="Path 1036"
            d="M0 16.191V1.654a2.5 2.5 0 01.717-.274c.712-.037 1.427-.013 2.134-.013C2.959.864 2.727.331 3.218 0h.261c.605.3.222.885.394 1.339h3.345c0-.235.015-.449 0-.661A.629.629 0 017.566 0h.261c.494.333.254.872.361 1.336h3.275c.121-.467-.157-1.012.364-1.336h.261c.591.3.228.889.4 1.367h2.194c.527 0 .645.114.645.642 0 4.159.011 8.317 0 12.476a1.909 1.909 0 01-2.082 2.046c-4.169 0-8.338 0-12.507.007A.771.771 0 010 16.191m.968-.609H13.168c.857 0 1.234-.383 1.235-1.259q.006-4.221 0-8.442c0-.111-.018-.222-.029-.339H.968zM.978 2.31v2.209h13.408v-2.2h-1.951v.8c0 .3-.094.522-.427.536s-.493-.2-.505-.518c-.01-.269 0-.538 0-.815H8.181a4.1 4.1 0 01-.085.966.636.636 0 01-.49.339c-.127 0-.33-.251-.369-.42a4.162 4.162 0 01-.017-.885H3.826c0 .27-.01.515 0 .758.017.317-.068.555-.426.575-.389.022-.487-.252-.507-.565-.016-.253 0-.508 0-.775z"
          />
          <Path
            data-name="Path 1037"
            d="M118.1 77.617h1.041a.455.455 0 01.509.509v2.084a.468.468 0 01-.515.514c-.679.008-1.359 0-2.038 0a.5.5 0 01-.544-.545q-.03-1.019 0-2.04a.5.5 0 01.6-.53c.318.014.636 0 .954 0m.592.971H117.5v1.179h1.186z"
            transform="translate(-106.344 -70.826)"
          />
          <Path
            data-name="Path 1038"
            d="M24.634 77.63h1.041a.441.441 0 01.487.483q.01 1.063 0 2.127a.454.454 0 01-.49.493c-.694.011-1.388.006-2.081 0-.369 0-.518-.243-.527-.562q-.027-1 0-2a.5.5 0 01.574-.553c.332.011.665 0 1 0m-.617 2.153h1.178v-1.2h-1.183z"
            transform="translate(-21.035 -70.838)"
          />
          <Path
            data-name="Path 1039"
            d="M72.9 79.2v.955a.508.508 0 01-.583.584c-.636 0-1.272-.008-1.908 0a.53.53 0 01-.612-.57 38.102 38.102 0 010-2 .5.5 0 01.576-.552c.665.011 1.33 0 1.995 0a.468.468 0 01.532.531v1.042m-.957-.6h-1.19v1.183h1.19z"
            transform="translate(-63.686 -70.834)"
          />
          <Path
            data-name="Path 1040"
            d="M118.155 129.749h-1.04a.482.482 0 01-.543-.532 83.336 83.336 0 010-2 .543.543 0 01.607-.583 80.733 80.733 0 011.906 0 .531.531 0 01.6.622 44.95 44.95 0 000 1.908c0 .4-.169.591-.572.58-.318-.008-.635 0-.953 0m.56-2.15h-1.19v1.2h1.185z"
            transform="translate(-106.374 -115.561)"
          />
          <Path
            data-name="Path 1041"
            d="M26.195 128.178v1.044a.455.455 0 01-.511.508h-2.043a.476.476 0 01-.541-.493c-.023-.7-.019-1.392 0-2.088a.5.5 0 01.527-.525c.68-.017 1.362-.019 2.042 0a.5.5 0 01.534.594c-.014.318 0 .638 0 .957m-.959-.6h-1.201v1.194h1.193z"
            transform="translate(-21.065 -115.542)"
          />
          <Path
            data-name="Path 1042"
            d="M72.935 128.177v1.044a.455.455 0 01-.511.508h-2.043a.476.476 0 01-.541-.493c-.023-.7-.019-1.392 0-2.087a.5.5 0 01.527-.525c.68-.017 1.362-.019 2.042 0a.5.5 0 01.534.594c-.014.318 0 .638 0 .957m-2.158.583h1.189v-1.176h-1.196z"
            transform="translate(-63.718 -115.542)"
          />
        </G>
      </G>
    </Svg>
  )
}

export function RepeatIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23.145}
      height={12.546}
      viewBox="0 0 23.145 12.546"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 229"
            fill="none"
            d="M0 0H23.145V12.546H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 291">
        <G
          data-name="Group 290"
          transform="translate(1) translate(-1)"
          clipPath="url(#a)"
          fill="#161615"
        >
          <Path
            data-name="Path 1044"
            d="M78.554 12.49a13.731 13.731 0 01-1.033 2.393 4.891 4.891 0 01-4.286 2.071c-2.093.022-4.186.005-6.384.005 0 .372.013.715 0 1.056-.028.615-.407.821-.9.46-.937-.687-1.853-1.4-2.775-2.109-.383-.293-.34-.582.022-.86.906-.7 1.8-1.4 2.726-2.077a.768.768 0 01.629-.143c.157.075.259.368.287.579a8.61 8.61 0 01.012 1.1h2.367c1.383 0 2.766.022 4.149 0a3.016 3.016 0 002.811-4.41 2.876 2.876 0 00-2.385-1.6 4.486 4.486 0 01-.468-.064.969.969 0 01-.806-1.062.989.989 0 011.006-.887 5.045 5.045 0 014.685 3.258c.138.4.23.822.343 1.234z"
            transform="translate(-55.408 -6.107)"
          />
          <Path
            data-name="Path 1045"
            d="M11.7 1.719c0-.43-.021-.781 0-1.13.043-.577.368-.754.831-.423.96.686 1.9 1.4 2.837 2.12a.476.476 0 01.007.839A90.235 90.235 0 0112.51 5.3c-.418.3-.762.105-.8-.42-.028-.349-.005-.7-.005-1.068a1.073 1.073 0 00-.253-.076c-2.232 0-4.465-.031-6.7.021a2.932 2.932 0 00-2.684 3.461 3.037 3.037 0 002.86 2.539c.773.091 1.2.534 1.1 1.14s-.662.917-1.41.816a4.916 4.916 0 01-4.44-3.731 4.953 4.953 0 014.384-6.2c2.089-.1 4.186-.046 6.279-.06h.856"
          />
        </G>
      </G>
    </Svg>
  )
}

export function NotifIcon(props) {
  return (
    <Svg
      data-name="Group 294"
      xmlns="http://www.w3.org/2000/svg"
      width={18.975}
      height={21.764}
      viewBox="0 0 18.975 21.764"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 230"
            fill="none"
            d="M0 0H18.975V21.764H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 293" clipPath="url(#a)" fill="#161615">
        <Path
          data-name="Path 1046"
          d="M10.338 0a15.956 15.956 0 012.428 1.305 6.652 6.652 0 012.418 5.4 12.637 12.637 0 003.277 8.257c.425.489.344 1.417.515 2.234H.065A2.915 2.915 0 01.71 14.5a11.089 11.089 0 002.954-7.436c.074-2.226.565-4.318 2.444-5.756A16.756 16.756 0 018.531 0h1.806"
        />
        <Path
          data-name="Path 1047"
          d="M40.93 100.626a2.988 2.988 0 01-2.978 3.5 3.108 3.108 0 01-3.168-3.5z"
          transform="translate(-28.456 -82.361)"
        />
      </G>
    </Svg>
  )
}


// FACILITIES SCREEN ICONS

export function WifiIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19.574}
      height={14.474}
      viewBox="0 0 19.574 14.474"
      {...props}
    >
      <Path
        d="M9.787 14.474a2.2 2.2 0 01-1.555-.635 2.15 2.15 0 010-3.07 2.216 2.216 0 013.109 0 2.152 2.152 0 010 3.07 2.2 2.2 0 01-1.554.635zM14.3 9.893a5.05 5.05 0 00-.885-1.171 5.16 5.16 0 00-8.143 1.169l-1.6-1.58a7.377 7.377 0 0112.232 0L14.3 9.892zM18 6.235a10.154 10.154 0 00-.962-1.1 10.353 10.353 0 00-14.512 0 10.372 10.372 0 00-.963 1.095L0 4.686A12.6 12.6 0 01.976 3.6a12.572 12.572 0 0117.624 0 12.618 12.618 0 01.976 1.082l-1.57 1.552z"
        fill={props.color ? props.color : "#222"}
      />
    </Svg>
  )
}

export function PIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12.485}
      height={15.601}
      viewBox="0 0 12.485 15.601"
      {...props}
    >
      <Path
        d="M1367.19 1255.987h-6.2v15.6h2.2v-4.859h3.994a6.84 6.84 0 004.636-1.438 5.075 5.075 0 001.652-4.045 4.793 4.793 0 00-1.641-3.878 7.019 7.019 0 00-4.648-1.382zm-.092 8.8h-3.9v-6.842l3.9-.022a5.065 5.065 0 013.167.858 3.009 3.009 0 011.1 2.529 3.124 3.124 0 01-1.1 2.6 4.971 4.971 0 01-3.167.88z"
        transform="translate(-1360.993 -1255.987)"
        fill={props.color ? props.color : "#222"}
      />
    </Svg>
  )
}

export function DrinksIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.705}
      height={24.975}
      viewBox="0 0 17.705 24.975"
      {...props}
    >
      <Path
        d="M3.942 24.975a2.042 2.042 0 01-2.076-1.664l-.02-.261-.726-10.14L.9 9.795c0-.055-.006-.112-.012-.167a3.075 3.075 0 00-.5-1.386 2.473 2.473 0 00-.11-.158 1.779 1.779 0 01-.027-1.86 1.936 1.936 0 01.358-.443 2.188 2.188 0 011.487-.568H12.57a2.187 2.187 0 011.489.568 1.953 1.953 0 01.357.443 1.779 1.779 0 01-.025 1.86c-.039.05-.075.1-.109.155a3.071 3.071 0 00-.5 1.389c-.007.055-.01.112-.012.167l-.223 3.115-.726 10.119-.022.314a2.046 2.046 0 01-2.072 1.632zM1.417 7.131a.581.581 0 00.07.277.631.631 0 00.078.11 4.336 4.336 0 01.657 1.527 4.205 4.205 0 01.076.5l.013.189.828 11.553.125 1.736v.037a.5.5 0 00.014.117.663.663 0 00.666.5h6.785a.664.664 0 00.663-.489.508.508 0 00.016-.131.3.3 0 000-.05l.123-1.725.829-11.552.014-.189a4.18 4.18 0 01.076-.5 4.318 4.318 0 01.65-1.522.75.75 0 00.077-.11.584.584 0 00.07-.277.651.651 0 00-.664-.621H2.081a.65.65 0 00-.664.62zm7.933 15.25H5.229a.648.648 0 01-.633-.62l-.038-.539-.591-8.236v-.035a.686.686 0 01.582-.655 7.294 7.294 0 013.1.268 8.388 8.388 0 001.263.183 5.925 5.925 0 00.887-.015c.045 0 .088-.009.133-.014h.017a.7.7 0 01.729.658l-.007.108-.553 7.738-.038.539a.649.649 0 01-.634.62zm-.825-10.425a.588.588 0 01-.5-.687c0-.017.008-.035.014-.052l1-3.411h.031a.5.5 0 01.01-.134c0-.017.009-.035.014-.051a.645.645 0 01.737-.408.6.6 0 01.512.593.4.4 0 01-.008.081l-.03.1-1.025 3.484-.037.125a.639.639 0 01-.592.37.685.685 0 01-.126-.01zm2.166-7.391a.587.587 0 01-.5-.687.273.273 0 01.007-.027l.01-.032.567-1.919c0-.02.008-.037.014-.058s.015-.057.025-.086A1.836 1.836 0 0112.352.543l.074-.008a.265.265 0 01.029 0L17.011 0a.686.686 0 01.181.009.589.589 0 01.5.687.606.606 0 01-.475.452l-4.641.539c-.021 0-.041 0-.062.007a.589.589 0 00-.465.366.366.366 0 00-.024.073v.008L11.444 4.1l-.021.07a.634.634 0 01-.6.4.72.72 0 01-.132-.004z"
        fill={props.color ? props.color : "#fff"}
      />
    </Svg>
  )
}

export function FoodIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32.051}
      height={31.572}
      viewBox="0 0 32.051 31.572"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 290"
            // fill="none"
            d="M0 0H32.051V31.572H0z"
            fill={props.color ? props.color : "#fff"}
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 493" clipPath="url(#a)">
        <Path
          data-name="Path 1065"
          d="M32.051 31.419a5.982 5.982 0 01-.957.153q-12.96 0-25.92-.017a2.946 2.946 0 01-3.208-2.174 1.208 1.208 0 00-.6-.573A2.192 2.192 0 010 26.649a2.127 2.127 0 011.383-2.063.918.918 0 00.634-.817 5.813 5.813 0 015.4-4.746c2.472-.1 4.951-.052 7.427-.068h1.069v-7.942c-3.592-1.243-5.076-3.262-4.678-6.393A5.519 5.519 0 0116.068.026C18.5-.2 21.424 1.079 22.216 4.973c2.816 0 5.647-.008 8.477.009a10.284 10.284 0 011.358.184zm-8.539-.954h7.5V13.187h-14v5.7h.842a6.1 6.1 0 016.026 4.764 1.223 1.223 0 00.76.989 2.218 2.218 0 01.36 3.847 3.131 3.131 0 00-1.488 1.979m7.532-24.432H17.051v6.047h13.993zm-8.2 18.25a4.652 4.652 0 00-4.313-4.238c-3.6-.111-7.2-.1-10.805-.09a4.814 4.814 0 00-4.736 4.328zm-9.872 1.176v-.014H2.484c-.948 0-1.5.425-1.514 1.218-.018.809.516 1.294 1.455 1.295h20.893c.977 0 1.5-.435 1.514-1.229.018-.827-.445-1.255-1.455-1.258-3.468-.012-6.936 0-10.4 0m9.889 3.612H2.991a1.765 1.765 0 001.93 1.491q7.8.01 15.606 0a4.659 4.659 0 00.98-.119 1.681 1.681 0 001.354-1.37M15.889 9.9c.077-.773.077-.773-.579-1.058a3.544 3.544 0 01-2.246-3.894 3.68 3.68 0 013.127-3.069 3.618 3.618 0 013.917 2.487c.192.588.47.659.961.5a4.31 4.31 0 00-4.383-3.856 4.437 4.437 0 00-4.512 4.051A4.454 4.454 0 0015.889 9.9m3.283-5a2.546 2.546 0 00-2.805-2.041 2.647 2.647 0 00-2.338 2.372 2.421 2.421 0 001.934 2.7c0-.692.032-1.369-.008-2.042-.046-.763.3-1.034 1.025-1 .708.033 1.418.007 2.194.007"
          fill={props.color ? props.color : "#fff"}
        />
      </G>
    </Svg>
  )
}

export function ToiletIcon(props) {
  return (
    <Svg
      data-name="Group 496"
      xmlns="http://www.w3.org/2000/svg"
      width={26.863}
      height={32.028}
      viewBox="0 0 26.863 32.028"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 292"
            fill="none"
            d="M0 0H26.863V32.028H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 495" clipPath="url(#a)">
        <Path
          data-name="Path 1066"
          d="M10.036 15.946c.019-.25.05-.462.05-.675V2.149C10.083.607 9.478.011 7.931 0H2.325C.6.007 0 .611 0 2.342v12.792c0 .265.025.531.038.791h1.309v-.963V2.418c0-1 .066-1.064 1.084-1.066 1.759 0 3.519.03 5.277-.015.778-.02 1.056.211 1.049 1.026-.036 4.236-.017 8.473-.017 12.709v.873zm16.826-1.69h-15.2V15.5h15.2z"
          fill={props.color ? props.color : "#fff"}
        />
        <Path
          data-name="Path 1067"
          d="M0 120.251v-14.477h26.5a8.48 8.48 0 01-1.785 5.74 8.277 8.277 0 01-6.985 3.213c-1.868-.039-3.738-.013-5.607 0-1.485.008-2.02.56-2.031 2.061q-.013 1.733-.028 3.465zm8.741-1.491v-2.106c.01-2.186 1.112-3.3 3.3-3.306 1.95-.009 3.9-.02 5.851 0a6.723 6.723 0 004.952-1.853 6.5 6.5 0 002.189-4.355H1.406v11.62z"
          transform="translate(-.003 -88.223)"
          fill={props.color ? props.color : "#fff"}
        />
        <Path
          data-name="Path 1068"
          d="M10.037 15.946H8.742v-.873c0-4.236-.019-8.473.017-12.709.007-.815-.271-1.046-1.049-1.026-1.758.045-3.518.012-5.276.015-1.018 0-1.083.063-1.084 1.066v13.507H.041C.028 15.665 0 15.4 0 15.134V2.342C0 .611.6.007 2.325 0h5.607c1.547.006 2.152.6 2.154 2.145q.011 6.561 0 13.122c0 .213-.031.425-.05.675"
          fill={props.color ? props.color : "#fff"}
        />
        <Path
          data-name="Rectangle 291"
          transform="translate(11.659 14.256)"
          d="M0 0H15.204V1.249H0z"
        />
      </G>
    </Svg>
  )
}


// SDG SCREEN ICONS


export function HeartIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.367 3.842a4.583 4.583 0 00-6.484 0L10 4.725l-.883-.883a4.584 4.584 0 10-6.484 6.483l.884.883L10 17.692l6.483-6.484.884-.883a4.585 4.585 0 000-6.483v0z"
        stroke="#E2B378"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


export function InfoIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={16}
      viewBox="0 0 15 16"
      {...props}
    >
      <G data-name="Group 1293">
        <G
          data-name="Ellipse 84"
          transform="translate(-265.544 -2663) translate(265.544 2664)"
          fill="#fff"
          stroke={props.color ?? "#fff"}
          strokeWidth={1}
        >
          <Circle cx={7.5} cy={7.5} r={7.5} stroke="none" />
          <Circle cx={7.5} cy={7.5} r={7} fill="none" />
        </G>
        <Text
          transform="translate(-265.544 -2663) translate(271.544 2675)"
          fill={props.color ?? "#fff"}
          fontSize={11}
          fontFamily="Poppins-SemiBold, Poppins"
          fontWeight={600}
        >
          <TSpan x={0} y={0}>
            {"i"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  )
}


// HAPPENING DETAILS ICONS

export function HappeningLocationIconSmall(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 7.733}
      height={props.height ?? 11.585}
      viewBox="0 0 7.733 11.585"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 223"
            fill={props.color ?? "#594bb8"}
            d="M0 0H7.733V11.585H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 263" clipPath="url(#a)">
        <Path
          data-name="Path 1031"
          d="M7.727 4.083A3.627 3.627 0 017.163 6.1q-1.457 2.582-2.921 5.159c-.246.434-.479.434-.723 0C2.482 9.424 1.4 7.611.424 5.741A3.936 3.936 0 013.77 0a3.837 3.837 0 013.957 4.083m-2.078-.191A1.773 1.773 0 102.1 3.83a1.746 1.746 0 001.73 1.8 1.735 1.735 0 001.819-1.738"
          transform="translate(.001)"
          fill={props.color ?? "#594bb8"}
        />
      </G>
    </Svg>
  )
}

export function RattingStartIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 12.27}
      height={props.height ?? 11.621}
      viewBox="0 0 12.27 11.621"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 222"
            fill={props.color ?? "#f65997"}
            d="M0 0H12.27V11.621H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 262">
        <G
          data-name="Group 261"
          transform="translate(1 1) translate(-1 -1)"
          clipPath="url(#a)"
        >
          <Path
            data-name="Path 1030"
            d="M9.843 11.621h-.472c-.389-.153-.773-.321-1.168-.457-2.31-.8-1.8-.818-4.136 0-.395.138-.779.305-1.168.459h-.472a.735.735 0 01-.248-.688c.023-.846.033-1.692.062-2.537A2.091 2.091 0 001.8 7.027C1.21 6.249.6 5.486 0 4.717v-.335a3.141 3.141 0 01.572-.32c.768-.242 1.544-.462 2.32-.683a2.285 2.285 0 001.332-.954c.458-.688.934-1.365 1.406-2.043.354-.509.656-.509 1.01 0 .472.679.948 1.355 1.406 2.044a2.28 2.28 0 001.332.954c.775.22 1.551.44 2.32.682a3.144 3.144 0 01.572.32v.335l-1.756 2.262a2.19 2.19 0 00-.486 1.487c.035.834.041 1.67.063 2.5a.686.686 0 01-.249.651"
            fill={props.color ?? "#f65997"}
          />
        </G>
      </G>
    </Svg>
  )
}


export function CalenderHappeningIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24.362}
      height={24.161}
      viewBox="0 0 24.362 24.161"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 623"
            fill="#766bc3"
            d="M0 0H24.362V24.161H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 1273" clipPath="url(#a)" fill="#766bc3">
        <Path
          data-name="Path 1246"
          d="M22.6 24.161H1.764c-.114-.047-.226-.1-.342-.14A2.092 2.092 0 010 22.028V4.33a2.033 2.033 0 01.7-1.524 3.146 3.146 0 012.559-.561c0 .355-.024.68.009 1a1.164 1.164 0 00.2.576.821.821 0 001.011.28.9.9 0 00.644-.89c.006-.72-.007-1.44.006-2.159a.965.965 0 111.93-.125c.028.417.006.838.006 1.31h3.18a10.584 10.584 0 00.084 1.146.911.911 0 001.454.58.986.986 0 00.4-.878c0-.663-.011-1.327.005-1.99A1 1 0 0113.167 0c.57 0 .939.433.945 1.107v1.124h3.221c0 .334-.007.628 0 .922a.983.983 0 00.442.862.882.882 0 00.952.013.966.966 0 00.512-.942c.006-.691-.014-1.384.008-2.074a.957.957 0 011.01-1.007.967.967 0 01.911 1.056v1.162c.383 0 .716-.006 1.049 0a2.331 2.331 0 012.144 1.6v18.728a2.505 2.505 0 01-1.764 1.61M12.2 9.483H4.43c-.841 0-1.232.4-1.233 1.248v8.9a1.122 1.122 0 001.257 1.286q7.749.005 15.5 0c.852 0 1.228-.4 1.229-1.249 0-1.045.032-2.091-.006-3.134-.079-2.191.216-4.392-.166-6.573a.508.508 0 00-.344-.337c-2.149-.061-4.3-.1-6.447-.135-.672-.011-1.344 0-2.016 0"
        />
        <Path
          data-name="Path 1247"
          d="M80.115 177.145c-.364 0-.728.012-1.091 0a.716.716 0 01-.756-.775 38.663 38.663 0 010-1.523.714.714 0 01.735-.8 28.325 28.325 0 012.181 0 .74.74 0 01.767.823c.012.479.01.959 0 1.438a.757.757 0 01-.83.841c-.335.008-.671 0-1.007 0"
          transform="translate(-73.225 -162.733)"
        />
        <Path
          data-name="Path 1248"
          d="M80.074 248.908c-.35 0-.7.013-1.049 0a.721.721 0 01-.756-.778 38.663 38.663 0 010-1.523.713.713 0 01.735-.8 31.09 31.09 0 012.223 0 .718.718 0 01.723.776c.017.507.016 1.016 0 1.523a.754.754 0 01-.828.8c-.349.009-.7 0-1.049 0"
          transform="translate(-73.226 -229.838)"
        />
        <Path
          data-name="Path 1249"
          d="M245.372 177.163c-.349 0-.7.01-1.048 0a.707.707 0 01-.774-.757 20.392 20.392 0 010-1.564.7.7 0 01.755-.779 32.428 32.428 0 012.138 0 .721.721 0 01.78.761 15.25 15.25 0 010 1.606.716.716 0 01-.8.736c-.349.01-.7 0-1.048 0"
          transform="translate(-227.864 -162.751)"
        />
        <Path
          data-name="Path 1250"
          d="M245.392 248.926c-.349 0-.7.01-1.048 0a.721.721 0 01-.792-.785 22.068 22.068 0 010-1.522.715.715 0 01.781-.8c.7-.02 1.4-.018 2.1 0a.733.733 0 01.8.787c.023.506.023 1.016 0 1.522a.742.742 0 01-.83.8c-.335.009-.671 0-1.006 0"
          transform="translate(-227.866 -229.856)"
        />
        <Path
          data-name="Path 1251"
          d="M162.648 248.972c-.321 0-.643.005-.964 0a.759.759 0 01-.86-.814c-.02-.492-.02-.986 0-1.479a.763.763 0 01.86-.818q.984-.016 1.969 0a.771.771 0 01.853.866c.009.479.011.958 0 1.437a.724.724 0 01-.809.807c-.349.01-.7 0-1.047 0"
          transform="translate(-150.46 -229.902)"
        />
        <Path
          data-name="Path 1252"
          d="M162.662 177.183c-.349 0-.7.007-1.047 0a.736.736 0 01-.813-.771 15.214 15.214 0 010-1.563.74.74 0 01.817-.771q1.026-.025 2.053 0a.753.753 0 01.807.825q.018.739 0 1.479a.72.72 0 01-.812.8c-.335.008-.67 0-1.005 0"
          transform="translate(-150.435 -162.77)"
        />
      </G>
    </Svg>
  )
}

export function ClockHappeningIcon(props) {
  return (
    <Svg
      data-name="Group 1274"
      xmlns="http://www.w3.org/2000/svg"
      width={26.271}
      height={26.498}
      viewBox="0 0 26.271 26.498"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 96"
            fill="#766bc3"
            d="M0 0H26.271V26.498H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 73" clipPath="url(#a)" fill="#766bc3">
        <Path
          data-name="Path 96"
          d="M14.692 26.5H11.6a2.917 2.917 0 00-.364-.1 12.647 12.647 0 01-7.466-3.816A13.058 13.058 0 01.132 11.367a12.6 12.6 0 013.759-7.538A12.8 12.8 0 0115.1.146a13.1 13.1 0 0110.79 9.867c.137.562.253 1.13.379 1.695v3.114c-.062.266-.139.529-.184.8a13.152 13.152 0 01-9.668 10.49c-.574.139-1.151.261-1.727.39m9.187-13.2a10.735 10.735 0 10-10.786 10.8A10.774 10.774 0 0023.878 13.3"
        />
        <Path
          data-name="Path 97"
          d="M121.432 75.712h3.383c1.029 0 2.057 0 3.085.016a1.067 1.067 0 011.008.7 1.045 1.045 0 01-.165 1.222 1.661 1.661 0 01-1 .472c-2.491.039-4.982.033-7.473.013a1.176 1.176 0 01-1.25-1.258q-.034-2.771 0-5.543a1.155 1.155 0 011.245-1.241 1.14 1.14 0 011.159 1.266c.018.713 0 1.426.005 2.139s0 1.423 0 2.208"
          transform="translate(-107.482 -63.256)"
        />
      </G>
    </Svg>
  )
}

export function MinFellowsIcon(props) {
  return (
    <Svg
      data-name="Group 1275"
      xmlns="http://www.w3.org/2000/svg"
      width={27.672}
      height={26.026}
      viewBox="0 0 27.672 26.026"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 92"
            fill="#766bc3"
            d="M0 0H27.672V26.026H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 56" clipPath="url(#a)">
        <Path
          data-name="Path 84"
          d="M107.114 169.18c-2.877-3.446-2.989-6.545-.2-9.193a5.987 5.987 0 017.785-.039c2.748 2.577 2.633 5.782-.381 9.457a8.686 8.686 0 014.668 5.062c.741 1.983.48 4.031.443 6.057-.005.284-.6.795-.928.8-5.1.051-10.193.031-15.29.041a.96.96 0 01-1.046-1c-.137-2.8-.242-5.652 1.627-7.992a33.385 33.385 0 013.318-3.188"
          transform="translate(-96.969 -155.338)"
          fill="#766bc3"
        />
      </G>
    </Svg>
  )
}

export function MaxFellowsIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27.671}
      height={26.026}
      viewBox="0 0 27.671 26.026"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 624"
            fill="#766bc3"
            d="M0 0H27.672V26.026H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 1276" clipPath="url(#a)" fill="#766bc3">
        <Path
          data-name="Path 1253"
          d="M2.478 17.093a2.846 2.846 0 01-.428-4.216 2.752 2.752 0 013.93-.147 2.862 2.862 0 01-.255 4.377A4.255 4.255 0 018.2 21.381c-.018 1.431 0 1.431-1.423 1.431h-6c-.59 0-.78-.171-.776-.762a10.561 10.561 0 01.092-1.96 3.922 3.922 0 012.385-3"
          transform="translate(.001 -10.82)"
        />
        <Path
          data-name="Path 1254"
          d="M209.915 16.975a4.091 4.091 0 012.411 4.046c-.01.336 0 .672 0 1.008-.006.419-.2.658-.636.657h-6.854c-.335 0-.586-.148-.6-.476-.079-1.36-.185-2.752.769-3.886a17.116 17.116 0 011.553-1.454 2.729 2.729 0 01-1.051-2.313 2.776 2.776 0 014.8-1.826c1.16 1.275 1.016 2.9-.384 4.242"
          transform="translate(-184.657 -10.694)"
        />
        <Path
          data-name="Path 1255"
          d="M104.461 163.541c-1.354-1.622-1.407-3.079-.092-4.325a2.817 2.817 0 013.663-.018c1.293 1.213 1.239 2.721-.179 4.45a4.087 4.087 0 012.2 2.382 7.491 7.491 0 01.208 2.85c0 .133-.283.374-.437.376-2.4.024-4.8.015-7.194.019a.452.452 0 01-.492-.472 5.254 5.254 0 01.765-3.76 15.707 15.707 0 011.561-1.5"
          transform="translate(-92.34 -143.247)"
        />
        <Path
          data-name="Path 1256"
          d="M90.383 0a12.6 12.6 0 015.023 1.172 1.154 1.154 0 01.657 1.5 1.1 1.1 0 01-1.479.558 11.761 11.761 0 00-3.481-.9 9.842 9.842 0 00-4.288.651c-.237.089-.47.192-.71.269A1.092 1.092 0 0184.7 2.7a1.1 1.1 0 01.585-1.485 19.1 19.1 0 012.648-.9A21.02 21.02 0 0190.383 0"
          transform="translate(-76.518)"
        />
        <Path
          data-name="Path 1257"
          d="M194.152 148.183a1.162 1.162 0 01-1.035-.728 1.04 1.04 0 01.3-1.255c.341-.284.722-.52 1.067-.8a9.515 9.515 0 003.2-4.82 5.484 5.484 0 01.243-.674 1.08 1.08 0 011.252-.624 1.064 1.064 0 01.8 1.237 11.271 11.271 0 01-1.943 4.33 11.952 11.952 0 01-3.129 2.983 5.618 5.618 0 01-.755.352"
          transform="translate(-174.567 -125.823)"
        />
        <Path
          data-name="Path 1258"
          d="M31.215 147.547a1 1 0 01-.551.94 1.158 1.158 0 01-1.219-.081 11.467 11.467 0 01-3.948-4.214 22.093 22.093 0 01-1.171-2.871 1.068 1.068 0 01.674-1.465 1.124 1.124 0 011.445.807 26.66 26.66 0 001.287 2.922 8.188 8.188 0 002.744 2.818 1.3 1.3 0 01.744 1.144"
          transform="translate(-21.925 -126.319)"
        />
      </G>
    </Svg>
  )
}

// HAPPENING DETAILS ICONS

export function RequestSubmittedSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={63.659}
      height={48.496}
      viewBox="0 0 63.659 48.496"
      {...props}
    >
      <G data-name="checkout sucsess">
        <Path
          d="M12.461 45.057L1.022 31.424a4.37 4.37 0 116.694-5.618l8.065 9.612L51.071 1.34A4.774 4.774 0 0157.7 8.209L19.589 45.016a4.76 4.76 0 01-1.612 1.026 4.372 4.372 0 01-5.516-.986z"
          transform="translate(4.496 1.878)"
          fill="#5b4dbc"
          opacity={0.241}
        />
        <G data-name="Union" fill="none">
          <Path d="M12.461 45.058L1.021 31.424a4.369 4.369 0 116.694-5.617l8.066 9.611L51.071 1.34A4.774 4.774 0 0157.7 8.209L19.589 45.016a4.757 4.757 0 01-1.609 1.025 4.371 4.371 0 01-5.518-.984z" />
          <Path
            d="M15.81 45.618c.588 0 1.165-.153 1.672-.444l.067-.039.073-.027a3.747 3.747 0 001.272-.811L57.01 7.49a3.75 3.75 0 001.151-2.65 3.748 3.748 0 00-1.059-2.687A3.742 3.742 0 0054.387 1c-.983 0-1.914.376-2.621 1.06L15.704 36.882 6.95 26.45a3.372 3.372 0 00-4.746-.416 3.374 3.374 0 00-.416 4.748l11.44 13.633a3.363 3.363 0 002.583 1.203m0 1a4.36 4.36 0 01-3.35-1.56L1.021 31.424a4.37 4.37 0 016.695-5.616l8.065 9.61L51.071 1.34a4.774 4.774 0 016.633 6.869L19.588 45.016a4.757 4.757 0 01-1.608 1.026 4.353 4.353 0 01-2.17.576z"
            fill="#000"
          />
        </G>
      </G>
    </Svg>
  )
}

export function RecursionIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={11.398}
      height={8.509}
      viewBox="0 0 11.398 8.509"
      {...props}
    >
      <G data-name="Group 1241" fill="#fff">
        <Path
          data-name="Path 1202"
          d="M-265.516 356.545c-.455-.363-.442-.607.1-1.345-.125-.006-.224-.015-.323-.015h-5.626a2.042 2.042 0 01-1.339-.419 1.86 1.86 0 01-.69-1.514c0-.751-.006-1.5 0-2.252 0-.436.243-.709.6-.715s.624.276.629.724c.008.731 0 1.463 0 2.194 0 .565.167.724.735.724h6.04c-.129-.151-.218-.247-.3-.35a.6.6 0 01.016-.888.576.576 0 01.9.073c.408.447.8.9 1.191 1.368a.622.622 0 01-.034.9c-.434.511-.878 1.013-1.318 1.519z"
          transform="translate(273.395 -312.179) translate(0 -35.856)"
        />
        <Path
          data-name="Path 1203"
          d="M-239.268 318.113c-.382.435-.628.5-.958.256a.729.729 0 01-.258-.648v-2.223c-.005-.459-.209-.661-.671-.662q-2.974-.007-5.948 0c-.035 0-.07.005-.149.012.121.149.221.264.311.386a.651.651 0 01-.048.875.613.613 0 01-.85-.049 27.8 27.8 0 01-1.266-1.457.628.628 0 01.058-.835q.575-.682 1.171-1.347a.608.608 0 01.885-.087.6.6 0 01.045.884c-.088.115-.181.227-.313.391h.344c1.768 0 3.536.031 5.3-.011a2.151 2.151 0 012.349 1.412z"
          transform="translate(273.395 -312.179) translate(-22.728)"
        />
      </G>
    </Svg>
  )
}


export function ChatIcon(props) {
  return (
    <Svg
      data-name="Group 87"
      xmlns="http://www.w3.org/2000/svg"
      width={37.656}
      height={27.372}
      viewBox="0 0 37.656 27.372"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 95"
            fill="#5b4dbc"
            d="M0 0H37.656V27.372H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 70" clipPath="url(#a)">
        <Path
          data-name="Path 95"
          d="M13.306 27.372c-1.635-1.605-3.12-3.1-4.654-4.546a5.805 5.805 0 00-1.685-1.147A11.283 11.283 0 01.028 10.54 11.158 11.158 0 019.223.222a11.956 11.956 0 012.152-.2C16.322 0 21.27-.014 26.217.018A11.233 11.233 0 0127.4 22.437c-2.9.178-5.825.082-8.737.159a1.889 1.889 0 00-1.169.486c-1.427 1.4-2.8 2.858-4.185 4.289M9.384 13.822a2.674 2.674 0 002.709-2.659 2.738 2.738 0 00-2.651-2.669 2.775 2.775 0 00-2.729 2.691 2.7 2.7 0 002.671 2.637m18.863 0A2.687 2.687 0 0030.92 11.2a2.714 2.714 0 00-2.684-2.629 2.628 2.628 0 10.012 5.255m-9.4 0a2.594 2.594 0 002.627-2.709 2.657 2.657 0 00-5.313.059 2.59 2.59 0 002.686 2.65"
          fill="#5b4dbc"
        />
      </G>
    </Svg>
  )
}

export function EditPencilIcon(props) {
  return (
    <Svg
      data-name="Group 1225"
      xmlns="http://www.w3.org/2000/svg"
      width={17.166}
      height={24.95}
      viewBox="0 0 17.166 24.95"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 132"
            fill={props.color ?? "#5b4dbc"}
            d="M0 0H17.166V24.95H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 159" clipPath="url(#a)">
        <Path
          data-name="Path 190"
          d="M0 24.054c.053-.541.122-1.08.155-1.622.075-1.248.12-2.5.207-3.745a1.946 1.946 0 01.252-.848Q5.8 9.3 11.013.776c.53-.869.988-.986 1.843-.465q1.82 1.109 3.634 2.226a1.093 1.093 0 01.41 1.735q-5.214 8.55-10.438 17.094a1.84 1.84 0 01-.6.594c-1.562.94-3.131 1.858-4.703 2.779-.6.351-.829.279-1.159-.34v-.345m10.207-19.6q-4.253 6.987-8.472 13.927a1.132 1.132 0 00-.141.487c-.054.7-.043 1.412-.144 2.107a1.136 1.136 0 00.734 1.375.587.587 0 00.652-.012c.718-.447 1.459-.857 2.175-1.307a1.712 1.712 0 00.534-.53q3.392-5.523 6.764-11.058c.544-.891 1.084-1.784 1.638-2.7l-3.74-2.288m.65-1.051L14.6 5.681l1.268-2.087L12.123 1.3l-1.266 2.1"
          fill={props.color ?? "#5b4dbc"}
        />
      </G>
    </Svg>
  )
}


export function PlusIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 21.213}
      height={props.height ?? 21.213}
      viewBox="0 0 21.213 21.213"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            d="M.3 14.7a1.036 1.036 0 001.464 0L7.5 8.964l5.733 5.736a1.035 1.035 0 001.467-1.467L8.964 7.5 14.7 1.767A1.035 1.035 0 0013.233.3L7.5 6.036 1.767.3A1.035 1.035 0 00.3 1.767L6.036 7.5.3 13.233a1.036 1.036 0 000 1.467z"
            transform="rotate(45 -.278 26.278)"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 4">
        <Path
          data-name="Shape"
          d="M.3 14.7a1.036 1.036 0 001.464 0L7.5 8.964l5.733 5.736a1.035 1.035 0 001.467-1.467L8.964 7.5 14.7 1.767A1.035 1.035 0 0013.233.3L7.5 6.036 1.767.3A1.035 1.035 0 00.3 1.767L6.036 7.5.3 13.233a1.036 1.036 0 000 1.467z"
          transform="translate(-7.893 -7.893) rotate(45 -.278 26.278)"
        />
        <G
          data-name="Mask Group 4"
          clipPath="url(#a)"
          transform="translate(-7.893 -7.893)"
        >
          <Path
            fill="#262628"
            transform="translate(-316 -70)"
            d="M0 0H600V600H0z"
          />
        </G>
      </G>
    </Svg>
  )
}


export function MarkerIcon(props) {
  return (
    <Svg
      data-name="location 2"
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 30 30"
      {...props}
    >
      <Circle cx={15} cy={15} r={15} fill="#bed5ff" opacity={0.8} />
      <Circle
        data-name="shape"
        cx={6}
        cy={6}
        r={6}
        transform="translate(9 9)"
        fill="#5b4dbc"
      />
    </Svg>
  )
}

export function MarkerIcon1(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={31.608}
      height={39.449}
      viewBox="0 0 31.608 39.449"
      {...props}
    >
      <G data-name="Group 1196" transform="translate(-125.7 -34.688)">
        <G fill="#8676ee" strokeMiterlimit={10}>
          <Path
            d="M16.695 37.996c-1.381-1.391-4.49-4.605-7.565-8.35C3.811 23.172 1 18.089 1 14.95c0-3.715 1.533-7.211 4.316-9.844C8.115 2.458 11.839 1 15.804 1s7.69 1.458 10.488 4.105c2.783 2.633 4.316 6.129 4.316 9.844 0 3.16-2.501 8.258-7.232 14.742-2.704 3.706-5.437 6.892-6.681 8.305z"
            transform="translate(125.7 34.688)"
          />
          <Path
            d="M16.65 36.525a119.854 119.854 0 005.928-7.437c4.533-6.216 7.03-11.237 7.03-14.139 0-3.437-1.422-6.676-4.004-9.118C22.992 3.361 19.512 2 15.804 2c-3.708 0-7.189 1.36-9.8 3.831C3.421 8.273 2 11.511 2 14.95 2 16.606 3.025 20.635 9.892 29c2.58 3.143 5.188 5.912 6.759 7.526m.087 2.924S0 23.206 0 14.95C0 6.693 7.076 0 15.804 0c8.728 0 15.804 6.693 15.804 14.95 0 8.256-14.87 24.5-14.87 24.5z"
            fill="#fff"
            transform="translate(125.7 34.688)"
          />
        </G>
        <G data-name="Icon">
          <Path
            d="M-86.615 17.853v4.767-4.767z"
            fill="#fff"
            transform="translate(133.36 42.262) translate(109.358 -8.659)"
            data-name="Oval"
            strokeMiterlimit={10}
          />
          <Path
            data-name="Icon"
            d="M7.556 17.874l-.334-.219-.4-.281q-.211-.151-.441-.323a24.423 24.423 0 01-2.562-2.191C1.442 12.507 0 10.029 0 7.5A7.762 7.762 0 018 0a7.762 7.762 0 018 7.5c0 2.529-1.442 5.007-3.819 7.36a24.423 24.423 0 01-2.558 2.191q-.229.171-.441.323l-.4.281-.334.219a.846.846 0 01-.888 0z"
            transform="translate(133.36 42.262) translate(-.36 -.412)"
            fill="#fff"
          />
        </G>
        <Ellipse
          data-name="Ellipse 16"
          cx={4.5}
          cy={4}
          rx={4.5}
          ry={4}
          transform="translate(137 45.85)"
          fill="#8676ee"
        />
      </G>
    </Svg>
  )
}




export function SettingsIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23.067}
      height={23.073}
      viewBox="0 0 23.067 23.073"
      {...props}
    >
      <Path
        data-name="Path 1711"
        d="M-323.062 496.036a5.019 5.019 0 01.3-.628 9.7 9.7 0 01.868-1.216 1.224 1.224 0 00.187-1.6.931.931 0 00-.769-.6c-.613-.075-1.218-.207-1.829-.3a.9.9 0 01-.86-.966 110.13 110.13 0 010-2.634.889.889 0 01.877-.946c.651-.09 1.3-.208 1.946-.327a1.387 1.387 0 00.7-1.74q-.572-.8-1.15-1.6a.906.906 0 01.113-1.33c.589-.568 1.154-1.159 1.74-1.731a.9.9 0 011.375-.1c.544.37 1.076.758 1.617 1.132a1.384 1.384 0 001.7-.693c.124-.686.249-1.373.357-2.062a.85.85 0 01.884-.8 63.166 63.166 0 012.753 0 .874.874 0 01.9.861c.1.651.193 1.3.314 1.948a1.349 1.349 0 001.744.692q.834-.581 1.665-1.169a.862.862 0 011.233.116q.907.913 1.821 1.819a.884.884 0 01.088 1.284c-.4.55-.784 1.106-1.169 1.664a1.386 1.386 0 00.714 1.7c.666.122 1.334.242 2 .355a.862.862 0 01.834.966q-.029 1.316 0 2.634a.766.766 0 01-.71.868c-.648.116-1.3.229-1.944.343a1.292 1.292 0 00-.8 1.851q.547.785 1.105 1.563a.894.894 0 01-.1 1.286q-.911.909-1.82 1.82a.866.866 0 01-1.237.089c-.569-.4-1.136-.812-1.713-1.2a1.4 1.4 0 00-1.669.7c-.122.667-.23 1.336-.336 2.006-.09.568-.35.891-.99.865a31.095 31.095 0 00-2.573 0 .845.845 0 01-.972-.815c-.122-.687-.22-1.379-.371-2.06a.865.865 0 00-.368-.449 1.4 1.4 0 00-1.95.212 7.6 7.6 0 01-1.111.808.825.825 0 01-1.141-.088c-.637-.632-1.279-1.261-1.9-1.91a2.976 2.976 0 01-.353-.618zm13.562-6.636a4.162 4.162 0 00-4.174-4.125 4.2 4.2 0 00-4.107 4.143 4.164 4.164 0 004.159 4.137 4.126 4.126 0 004.122-4.155z"
        transform="translate(325.177 -477.872)"
        fill={props.color ?? "#796dc7"}
      />
    </Svg>
  )
}


export function ChatSearchIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16.005}
      height={16.013}
      viewBox="0 0 16.005 16.013"
      {...props}
    >
      <Path
        data-name="search icon"
        d="M0 14.722l4.42-4.334a6.289 6.289 0 01-1.436-4A6.458 6.458 0 019.494 0 6.458 6.458 0 0116 6.39a6.459 6.459 0 01-6.506 6.39 6.557 6.557 0 01-3.713-1.144l-4.465 4.377zm4.844-8.331a4.651 4.651 0 009.3 0 4.651 4.651 0 00-9.3 0z"
        fill="rgba(34,34,34,0.4)"
      />
    </Svg>
  )
}

export function LikesNotifIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16.001}
      height={14}
      viewBox="0 0 16.001 14"
      {...props}
    >
      <Path
        d="M416.838 4934l-7.222-7.954.1.019a3.838 3.838 0 01-.719-2.245 3.8 3.8 0 013.771-3.82 3.719 3.719 0 012.157.687l.026-.05.356.361c.085.079.167.162.245.248l1.284 1.3h.313l1.883-1.909.045.045a3.721 3.721 0 012.151-.682 3.8 3.8 0 013.771 3.82 3.836 3.836 0 01-.674 2.18l.045.046-7.22 7.954z"
        transform="translate(-409 -4920)"
        fill="#35208e"
      />
    </Svg>
  )
}

export function ArrowForward(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25.263}
      height={15.411}
      viewBox="0 0 25.263 15.411"
      {...props}
    >
      <G
        data-name="Group 1115"
        transform="translate(.5 -51.584)"
        fill="none"
        stroke="#2a2a2a"
        strokeLinecap="round"
        strokeWidth={1}
      >
        <Path
          data-name="Line 10"
          transform="translate(0 59.289)"
          d="M0 0L24.058 0"
        />
        <Path
          data-name="Line 12"
          transform="translate(16.058 59.289)"
          d="M8 0L0 7"
        />
        <Path
          data-name="Line 11"
          transform="translate(16.058 52.289)"
          d="M8 7L0 0"
        />
      </G>
    </Svg>
  )
}


export function PCIcon(props) {
  return (
    <Svg
      data-name="Group 191"
      xmlns="http://www.w3.org/2000/svg"
      width={17.877}
      height={17.053}
      viewBox="0 0 17.877 17.053"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 138"
            fill="#5d5760"
            d="M0 0H17.877V17.053H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 190" clipPath="url(#a)">
        <Path
          data-name="Path 192"
          d="M.608 0h17.269v13.429a.97.97 0 01-.911.377c-1.867-.014-3.734-.006-5.6-.006h-.343v2h1.963v1.255H4.938v-1.267h1.938V13.8h-.365c-1.867 0-3.734-.018-5.6.009-.705.01-.912-.325-.911-.9Q.01 6.921 0 .934C0 .351.094.213.608 0m.7 9.382h15.314V1.309H1.307zm15.322 1.3H1.306v1.835H16.63zm-8.46 5.093h1.573v-1.956H8.17z"
          fill="#5d5760"
        />
      </G>
    </Svg>
  )
}

export function PhoneIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12.507}
      height={22.855}
      viewBox="0 0 12.507 22.855"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 139"
            fill="#5d5760"
            d="M0 0H12.507V22.855H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 193">
        <G
          data-name="Group 192"
          transform="translate(-.986 -35.426) translate(.986 35.426)"
          clipPath="url(#a)"
        >
          <Path
            data-name="Path 193"
            d="M1.584 0h9.423c1.29.488 1.5.8 1.5 2.233V21.205a1.638 1.638 0 01-1.671 1.649c-.29.009-.58 0-.871 0H1.893A1.607 1.607 0 01.06 21.427a1.023 1.023 0 00-.06-.144V1.588A7.376 7.376 0 01.368.695C.629.234 1.125.14 1.584 0m9.8 2.253H1.155v16.23h10.231zM7.606 20.687A1.338 1.338 0 006.3 19.33 1.336 1.336 0 106.263 22a1.315 1.315 0 001.343-1.315"
            fill="#5d5760"
          />
        </G>
      </G>
    </Svg>
  )
}

export function DirectionArrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 7.583}
      height={props.width ?? 6.822}
      viewBox="0 0 7.583 6.822"
      {...props}
    >
      <Path
        d="M0 5.972l5.208-4.766H.352V0h7.231v6.616h-1.32V1.944L.931 6.822z"
        fill="#5b4dbc"
      />
    </Svg>
  )
}

export function DonationIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28.403}
      height={24.666}
      viewBox="0 0 28.403 24.666"
      {...props}
    >
      <G data-name="Group 1370">
        <G data-name="Group 1369" fill="#796dc7">
          <Path
            data-name="Path 1712"
            d="M-291.265 322.776c-4.289-2.15-7.857-1.615-10.106 1.517a7.085 7.085 0 00.71 9.211l-3.948 3.944a2.724 2.724 0 01-.23-.205c-3.6-3.6-7.242-7.173-10.792-10.83a7.685 7.685 0 01-2.091-7.853 7.591 7.591 0 015.91-5.559 7.734 7.734 0 017.35 2.125 7.925 7.925 0 015.958-2.333 7.738 7.738 0 014.7 1.8c2.465 2.029 3.579 5.625 2.539 8.183z"
            transform="translate(-23.5 -43.672) translate(23.5 43.672) translate(318.062 -312.783)"
          />
          <Path
            data-name="Path 1713"
            d="M-195.269 384.421a5.939 5.939 0 01-6.145 5.888 6.036 6.036 0 01-5.785-6.054 6 6 0 016.138-5.849 5.939 5.939 0 015.792 6.015z"
            transform="translate(-23.5 -43.672) translate(23.5 43.672) translate(223.669 -368.657)"
          />
        </G>
        <Text
          data-name="$"
          transform="translate(-23.5 -43.672) translate(43 62)"
          fill="#fff"
          fontSize={9}
          fontFamily="HelveticaNeue-Bold, Helvetica Neue"
          fontWeight={700}
        >
          <TSpan x={0} y={0}>
            {"$"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  )
}

export function TrashIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.333h2.666a1.334 1.334 0 011.334 1.333V4m2 0v9.334a1.333 1.333 0 01-1.334 1.333H4.667a1.333 1.333 0 01-1.334-1.333V4h9.334zM6.667 7.333v4M9.333 7.333v4"
        stroke={props.color ?? "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


export function PetsIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={36.56}
      height={18.979}
      viewBox="0 0 36.56 18.979"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Rectangle 240"
            fill={props.color ?? "#fff"}
            d="M0 0H36.56V18.979H0z"
          />
        </ClipPath>
      </Defs>
      <G data-name="Group 338" clipPath="url(#a)" fill={props.color ?? "#fff"}>
        <Path
          data-name="Path 1053"
          d="M16.05 7.238c-.352.83-.723 1.7-1.089 2.576a.977.977 0 00-.124.424c.109 1.133.3 2.262.341 3.4a9.978 9.978 0 01-.2 2.713 2.864 2.864 0 01-3.278 2.238 3.641 3.641 0 01-3.161-3.312c.016-.393.389-.762.543-1.163.128-.332.35-.809.215-1.015-.18-.274-.658-.37-1.024-.5a1.02 1.02 0 00-.567 0c-.407.11-1.049.171-1.142.421a1.515 1.515 0 00.292 1.261 1.71 1.71 0 01.271 1.77 3.705 3.705 0 01-3.814 2.555C1.719 18.42.525 16.973.522 14.931c0-1.451.263-2.9.4-4.355.023-.238.108-.589-.011-.7C-.295 8.728-.023 7.261.168 5.92a38.546 38.546 0 011.2-5.086A1.382 1.382 0 012.333 0a1.473 1.473 0 011.08.684c.8 1.334 1.471 2.743 2.261 4.082a1.342 1.342 0 00.947.486c.848.066 1.71-.033 2.558.036a.9.9 0 001.048-.548c.673-1.33 1.36-2.66 2.139-3.93a1.656 1.656 0 011.191-.793 1.593 1.593 0 01.986 1.033c.548 1.981.985 3.994 1.507 6.188m-14.1.343l2.13-1.9-1.439-3.157C2.206 4.335 1.593 5.9 1.953 7.58m11.46-4.912h-.292l-1.343 2.984 2.109 1.868.256-.022-.729-4.829m-8.15 8.957a1.162 1.162 0 001.3-1.164A1.177 1.177 0 005.421 9.19a1.262 1.262 0 00-1.293 1.236 1.161 1.161 0 001.135 1.2m6.457-1.142a1.284 1.284 0 00-1.184-1.307 1.3 1.3 0 00-1.256 1.28 1.135 1.135 0 001.236 1.158 1.148 1.148 0 001.2-1.133"
        />
        <Path
          data-name="Path 1054"
          d="M91.818 27.826a6.644 6.644 0 01-1.254.756 2.477 2.477 0 01-.995-.108c.056-.337.007-.756.193-.989a2.4 2.4 0 011.025-.662c.6-.223.82-.542.424-1.272a9.7 9.7 0 01-1.44.729 3.3 3.3 0 01-1.092-.024c.1-.38.087-.867.325-1.114a4.87 4.87 0 011.3-.767c.377-.2 1-.28 1.109-.569a6.563 6.563 0 00.4-2.2c.034-1.511-.128-3.031-.016-4.533a1.888 1.888 0 011.049-1.356c.4-.134 1.1.276 1.509.634.536.473.867 1.173 1.374 1.688a1.76 1.76 0 001.073.469 33.486 33.486 0 003.487.005 1.727 1.727 0 001.059-.493c.566-.593.972-1.346 1.57-1.9a1.762 1.762 0 011.4-.465 1.625 1.625 0 01.915 1.152 38.2 38.2 0 01.1 3.969 11.088 11.088 0 00-.1 1.509c.139.957.32 1.9 1.593 2.094a2.613 2.613 0 011.352.833c.2.217.112.709.154 1.077a3.027 3.027 0 01-1.01 0 10.959 10.959 0 01-1.446-.765c-.342.63-.315 1 .328 1.256a2.92 2.92 0 011.106.717c.19.219.146.642.206.974-.337.051-.713.221-1 .124a6.628 6.628 0 01-1.273-.775 11.082 11.082 0 01-4.809 3.355 4.121 4.121 0 01-3.414.151 11.554 11.554 0 01-5.192-3.5m3.868-3.444a1.279 1.279 0 001.279-1.251 1.135 1.135 0 00-1.217-1.176 1.072 1.072 0 00-1.192 1.168 1.136 1.136 0 001.129 1.259m5.629.007a1.193 1.193 0 001.181-1.251 1.088 1.088 0 00-1.2-1.184 1.119 1.119 0 00-1.183 1.212 1.215 1.215 0 001.2 1.224m-2.759 1.149l-1.3.833 1.255 1.523 1.254-1.508-1.208-.848m3.9-6.23l1.508 1.3v-3.164l-.272-.089-1.236 1.951m-9.406 1.336l1.52-1.385-1.285-1.871-.235.112z"
          transform="translate(-71.762 -12.651)"
        />
      </G>
    </Svg>
  )


}


export function SendIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={84}
      height={84}
      viewBox="0 0 84 84"
      {...props}
    >
      <Defs></Defs>
      <G
        transform="translate(22.02 12.14) translate(-22.02 -12.14)"
        filter="url(#a)"
      >
        <Circle
          data-name="btn"
          cx={19.5}
          cy={19.5}
          r={19.5}
          transform="translate(22.5 12.5)"
          fill="#35208e"
        />
      </G>
      <Path
        d="M.924 15.245l-.79-1.351L0 13.86l.036-.132L0 13.672l.057-.033L1.721 7.59.1 1.631 0 1.574.924 0l11.539 6.573.087-.049.432.284v1.629l-.432.285-.086-.049L.925 15.245zm2.5-6.711l-1.039 3.781 6.636-3.781h-5.6zM2.373 2.925L3.4 6.714h5.626L2.373 2.925z"
        transform="translate(22.02 12.14) translate(14.901 11.444)"
        fill="#eee"
      />
    </Svg>
  )
}