import logoDark from "./logo_dark.svg";
import logoLight from "./logo_light.svg";

export const Header = () => {
    return (
        <header className="flex flex-col gap-9 w-full">
            <div className="w-[500px] max-w-[100vw] p-4">
                <img
                    src={logoLight}
                    alt="Data Structures"
                    className="inline-block w-[100px] dark:hidden"
                />
                <img
                    src={logoDark}
                    alt="Data Structures"
                    className="hidden w-[100px] dark:inline-block"
                />
                <h1 className="inline-block text-3xl">Data Structures 101</h1>
            </div>
        </header>
    )
};