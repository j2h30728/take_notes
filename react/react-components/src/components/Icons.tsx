import { SVGAttributes } from "react";

export const LeftArrowIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width="12" height="21" viewBox="0 0 12 21" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1339 20.2077C10.729 20.5974 10.0734 20.5974 9.66956 20.2077L1.10657 11.9441C0.29781 11.1636 0.29781 9.89748 1.10657 9.11699L9.73158 0.792461C10.1323 0.406715 10.7797 0.401716 11.1857 0.782466C11.6009 1.17121 11.6049 1.81178 11.1969 2.20652L3.30286 9.82352C2.89796 10.2143 2.89796 10.8469 3.30286 11.2376L11.1339 18.7946C11.5388 19.1844 11.5388 19.8179 11.1339 20.2077Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const RightArrowIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.274561 15.2808C0.578236 15.5731 1.06993 15.5731 1.37283 15.2808L7.79507 9.08309C8.40164 8.49773 8.40164 7.54811 7.79507 6.96274L1.32632 0.719346C1.02576 0.430036 0.54019 0.426287 0.235743 0.71185C-0.0757027 1.00341 -0.078681 1.48384 0.22732 1.77989L6.14785 7.49264C6.45153 7.78569 6.45153 8.26014 6.14785 8.5532L0.274561 14.221C-0.0291147 14.5133 -0.0291147 14.9885 0.274561 15.2808Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LeftTriangle = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.905721 8.76427C0.432257 8.36475 0.432257 7.63525 0.905721 7.23573L8.1051 1.16076C8.75528 0.612125 9.75 1.0743 9.75 1.92502L9.75 14.075C9.75 14.9257 8.75528 15.3879 8.1051 14.8392L0.905721 8.76427Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const RightTriangle = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.09428 8.76427C9.56774 8.36475 9.56774 7.63525 9.09428 7.23573L1.8949 1.16076C1.24472 0.612125 0.25 1.0743 0.25 1.92502L0.25 14.075C0.25 14.9257 1.24472 15.3879 1.8949 14.8392L9.09428 8.76427Z"
        fill="currentColor"
      />
    </svg>
  );
};
