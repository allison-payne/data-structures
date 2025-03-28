export function Welcome() {
    return (
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[1800px] w-full space-y-6 px-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4 dark:bg-gray-50 text-gray-700">
          <p className="leading-6 text-center">
            Welcome to our interactive data structures website! Whether you're a student learning the fundamentals or a seasoned developer looking to refresh your knowledge,
            this platform offers a dynamic and engaging way to explore various data structures used in software development.
          </p>
          <p>
            Here, you'll find clear explanations and, more importantly, interactive examples that allow you to visualize and manipulate data structures like binary search trees,
            linked lists, stacks, queues, and more. By actively engaging with these examples, you can gain a deeper understanding of how these structures work, their underlying principles,
            and their practical applications in computer science.
          </p>
          <p>
            Start exploring today and take your understanding of data structures to the next level!
          </p>
        </div>
      </div>
    );
  }