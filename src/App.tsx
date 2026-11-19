import { useEffect, useState } from 'react';
import { BagItem, CartDrawer } from './components/CartDrawer';
import { CompareModal } from './components/CompareModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { MembershipBar } from './components/MembershipBar';
import { SwarovskiPdpView } from './components/SwarovskiPdpView';
import { CompareMachine, ProductCategory } from './data/catalog';

const BAG_STORAGE_KEY = 'nespresso_sg_bag_v1';

function resolveInitialView(): 'home' | 'pdp' {
  if (
    typeof window !== 'undefined' &&
    window.location.hash.includes('swarovski-shine-bundle')
  ) {
    return 'pdp';
  }
  return 'home';
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'pdp'>(resolveInitialView);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [bagOpen, setBagOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [highlightedLine, setHighlightedLine] = useState<'Original' | 'Vertuo' | null>(
    null
  );

  const [bagItems, setBagItems] = useState<BagItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(BAG_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as BagItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(bagItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [bagItems]);

  useEffect(() => {
    const onHashChange = () => setCurrentView(resolveInitialView());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigateHome = (
    sectionId?: string,
    category?: ProductCategory | 'all'
  ) => {
    if (category) setActiveCategory(category);
    setCurrentView('home');
    window.location.hash = '/';
    window.requestAnimationFrame(() => {
      if (sectionId && sectionId !== 'top') {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  const handleNavigatePdp = () => {
    setCurrentView('pdp');
    window.location.hash = '/order/machines/original/swarovski-shine-bundle';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToBag = (item: BagItem) => {
    setBagItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: Math.min(10, i.quantity + item.quantity) }
            : i
        );
      }
      return [...prev, item];
    });
    if (
      item.itemType === 'machine' &&
      (item.line === 'Original' || item.line === 'Vertuo')
    ) {
      setHighlightedLine(item.line);
    }
    setBagOpen(true);
  };

  const handleAddComparedMachine = (machine: CompareMachine) => {
    handleAddToBag({
      id: machine.id,
      name: machine.name,
      subtitle: `${machine.line} Line`,
      priceSgd: machine.priceSgd,
      image: machine.image,
      quantity: 1,
      itemType: 'machine',
      line: machine.line,
    });
  };

  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setBagItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setBagItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: Math.min(10, quantity) } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setBagItems((prev) => prev.filter((item) => item.id !== id));
  };

  const bagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1B1918]">
      <Header
        currentView={currentView}
        bagCount={bagCount}
        isLoggedIn={isLoggedIn}
        onToggleAuth={() => setIsLoggedIn((prev) => !prev)}
        onNavigateHome={handleNavigateHome}
        onNavigatePdp={handleNavigatePdp}
        onOpenBag={() => setBagOpen(true)}
      />

      <MembershipBar
        isLoggedIn={isLoggedIn}
        onSignIn={() => setIsLoggedIn(true)}
      />

      <div className="flex-1">
        {currentView === 'home' ? (
          <HomeView
            activeCategory={activeCategory}
            compareIds={compareIds}
            onChangeCategory={setActiveCategory}
            onToggleCompare={handleToggleCompare}
            onOpenCompare={() => setCompareOpen(true)}
            onClearCompare={() => setCompareIds([])}
            onOpenSwarovskiPdp={handleNavigatePdp}
            onAddToBag={handleAddToBag}
          />
        ) : (
          <SwarovskiPdpView
            onBackToStorefront={() => handleNavigateHome('top', 'all')}
            onAddToBag={handleAddToBag}
          />
        )}
      </div>

      <Footer
        onNavigateHome={() => handleNavigateHome('top', 'all')}
        onNavigatePdp={handleNavigatePdp}
      />

      <CompareModal
        isOpen={compareOpen}
        selectedIds={compareIds}
        onSetSelectedIds={setCompareIds}
        onClose={() => setCompareOpen(false)}
        onAddToCart={handleAddComparedMachine}
        onOpenSwarovskiPdp={handleNavigatePdp}
      />

      <CartDrawer
        isOpen={bagOpen}
        items={bagItems}
        highlightedMachineLine={highlightedLine}
        onClose={() => setBagOpen(false)}
        onAddToCart={handleAddToBag}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={() => {
          setBagItems([]);
          setHighlightedLine(null);
        }}
        onBrowseSwarovski={handleNavigatePdp}
      />
    </div>
  );
}
