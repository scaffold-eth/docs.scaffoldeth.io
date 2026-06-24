"use client";

import {
  useMemo,
  useState,
  useEffect,
  Children,
  createContext,
  isValidElement,
  useReducer,
  useCallback,
  useContext,
} from "react";

const tabsGroupStore: Record<string, string> = {};
const tabsGroupListeners: Record<string, Set<() => void>> = {};

function getGroupValue(groupId: string): string | undefined {
  return tabsGroupStore[groupId];
}

function setGroupValue(groupId: string, value: string): void {
  tabsGroupStore[groupId] = value;
  tabsGroupListeners[groupId]?.forEach((listener) => listener());
}

function subscribeToGroup(groupId: string, listener: () => void): () => void {
  if (!tabsGroupListeners[groupId]) {
    tabsGroupListeners[groupId] = new Set();
  }
  tabsGroupListeners[groupId].add(listener);
  return () => {
    tabsGroupListeners[groupId].delete(listener);
  };
}

type TabsContextValue = {
  groupId?: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

type TabsProps = {
  groupId?: string;
  children: React.ReactNode;
  defaultValue?: string;
};

export function Tabs({ groupId, children, defaultValue }: TabsProps) {
  const tabs = useMemo(() => {
    const tabItems: Array<{ value: string; label: string; default: boolean }> = [];

    Children.forEach(children, (child) => {
      if (isValidElement<TabItemProps>(child)) {
        // Check if it's a TabItem by checking props
        if (child.props?.value) {
          tabItems.push({
            value: child.props.value,
            label: child.props.label || child.props.value,
            default: child.props.default || false,
          });
        }
      }
    });

    return tabItems;
  }, [children]);

  const defaultTab = tabs.find((t) => t.default)?.value || tabs[0]?.value || defaultValue || "";

  // Local state for tabs without groupId
  const [localActiveTab, setLocalActiveTab] = useState<string>(defaultTab);

  // Sync state for tabs with groupId
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!groupId) return;

    if (!getGroupValue(groupId)) {
      setGroupValue(groupId, defaultTab);
    }

    const unsubscribe = subscribeToGroup(groupId, forceUpdate);
    return unsubscribe;
  }, [groupId, defaultTab]);

  const activeTab = groupId ? getGroupValue(groupId) || defaultTab : localActiveTab;

  const setActiveTab = useCallback(
    (value: string) => {
      if (groupId) {
        setGroupValue(groupId, value);
      } else {
        setLocalActiveTab(value);
      }
    },
    [groupId],
  );

  useEffect(() => {
    if (!activeTab && tabs.length > 0) {
      setActiveTab(defaultTab);
    }
  }, [activeTab, tabs, defaultTab, setActiveTab]);

  return (
    <TabsContext.Provider value={{ groupId, activeTab, setActiveTab }}>
      <div
        className="vocs_Tabs_list"
        role="tablist"
        style={{
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeTab === tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              padding: "0.5rem 1rem",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderBottom:
                activeTab === tab.value ? "2px solid var(--vocs-color_textAccent)" : "2px solid transparent",
              color: activeTab === tab.value ? "var(--vocs-color_textAccent)" : "var(--vocs-color_text2)",
              fontWeight: activeTab === tab.value ? "600" : "400",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {children}
    </TabsContext.Provider>
  );
}

interface TabItemProps {
  value: string;
  label?: string;
  default?: boolean;
  children: React.ReactNode;
}

export function TabItem({ value, label: _label, default: _isDefault, children }: TabItemProps) {
  const context = useContext(TabsContext);

  // Only render if this tab is active
  if (!context || context.activeTab !== value) {
    return null;
  }

  return <>{children}</>;
}
