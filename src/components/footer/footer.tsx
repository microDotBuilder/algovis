export default function Footer() {
  return (
    <footer className="border-t bg-white py-6">
      <div className="container grid gap-4 text-[8px] leading-relaxed text-muted-foreground md:grid-cols-3">
        <div className="space-y-2">
          <h4 className="font-semibold text-[10px] text-foreground">
            Quick Links
          </h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Algorithms Guide
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-[10px] text-foreground">
            Resources
          </h4>
          <ul className="space-y-1">
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Algorithm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                What is an Algorithm?
              </a>
            </li>
            <li>
              <a
                href="https://www.geeksforgeeks.org/fundamentals-of-algorithms/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Algorithm Fundamentals
              </a>
            </li>
            <li>
              <a
                href="https://www.khanacademy.org/computing/computer-science/algorithms"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Khan Academy: Algorithms
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <p>
            &copy; {new Date().getFullYear()} Algorithm Visualizer. All rights
            reserved.
          </p>
          <p>Version 1.0.0</p>
          <p>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            |
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </p>
          <p>
            Contact:
            <a
              href="https://github.com/microDotBuilder/algovis/issues"
              className="hover:underline"
            >
              micro.builder.io
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
