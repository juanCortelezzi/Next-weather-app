import { useState } from "react";

export default function Help() {
  const [isShown, setIsShown] = useState(false);
  return (
    <div id="questionmark-logo_wrapper">
      <img
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        id="questionmark-logo"
        src="/images/questionMark.svg"
        alt="help logo"
      />
      {isShown && (
        <div id="help">
          <p>
            For better precision, type the city, add a "," (comma) and the two letter country code
            where the desired city is located in.
            <br />
            <br />
            "New York, US" <br />
            or <br />
            "Buenos Aires, AR"
          </p>
        </div>
      )}
    </div>
  );
}
