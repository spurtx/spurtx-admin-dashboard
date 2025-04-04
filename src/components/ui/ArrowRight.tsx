
interface ArrowRightProps {
    onClick?: () => void;
}

const ArrowRight = ({onClick}: ArrowRightProps) => {
  return (
    <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1"
            onClick={onClick}
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#00A15D", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#C16407", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M9 18l6-6-6-6"
              stroke="url(#grad1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
  )
}

export default ArrowRight