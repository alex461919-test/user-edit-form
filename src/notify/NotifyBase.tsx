import ReactDOM from 'react-dom/client';

abstract class NotifyBase extends Set<number> {
  root: ReactDOM.Root;

  constructor(elementId: string) {
    super();
    document.getElementById(elementId)?.remove();
    const mountPoint = document.createElement('div');
    mountPoint.id = elementId;
    document.body.append(mountPoint);
    this.root = ReactDOM.createRoot(mountPoint);
  }

  addElement(id: number) {
    throw new Error('Function not implemented.');
  }

  deleteElement(id: number) {
    throw new Error('Function not implemented.');
  }

  get value() {
    const show = () => {
      const id = Math.random();
      this.addElement(id);
      return () => {
        this.deleteElement(id);
      };
    };
    return { show };
  }
}
export default NotifyBase;
