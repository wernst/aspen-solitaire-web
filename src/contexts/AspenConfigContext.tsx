import { createContext, useCallback, useEffect, useState } from "react";
import { config as aspenConfig } from "@aspen.cloud/client";

export const AspenConfigContext = createContext<
  [
    Record<string, string>,
    (
      key: string,
      value: string,
      options?: aspenConfig.ConfigUpdateOptions
    ) => void
  ]
>([
  {},
  () => {
    throw new Error("NOT IMPLEMENTED");
  },
]);

export const AspenConfigProvider: React.FC = (props) => {
  const [config, setConfig] = useState<Record<string, string>>(
    aspenConfig.config
  );

  useEffect(() => {
    aspenConfig.load(
      (c) => {
        Object.entries(c).forEach(([k, v]) => {
          setConfigValue(k, v, { local: false, remote: false });
        });
      },
      () => {}
    );
    setConfig({ ...aspenConfig.config });
  }, []);

  const setConfigValue = useCallback(
    (
      key: string,
      value: string,
      options: aspenConfig.ConfigUpdateOptions = {
        local: true,
        remote: true,
      }
    ) => {
      aspenConfig.update(key, value, options);
      setConfig({ ...aspenConfig.config, [key]: value });
    },
    [setConfig]
  );

  return (
    <AspenConfigContext.Provider value={[config, setConfigValue]}>
      {props.children}
    </AspenConfigContext.Provider>
  );
};
