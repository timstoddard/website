import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PrettyPrinter {

    private static Node<Integer> test() {

       int capacity = 20; // max capacity of the array
       MyHeap heap = new MyHeap(capacity);

       // build/insert section //
       heap.buildHeap(new int[] {2,9,4,8,1,7,3,6,5});
       for (int i = 0; i < capacity; i++) {
          heap.insert((int) (Math.random() * 99) + 1); // numbers longer than 3 chars will break the spacing
       }
       //////////////////////////

       int[] temp = heap.heapContents();
       ArrayList<Node<Integer>> data = new ArrayList<Node<Integer>>();
       data.add(new Node<Integer>(-1));
       for (int i = 0; i < temp.length; i++) {
          data.add(new Node<Integer>(temp[i]));
       }
       for (int i = 1; i < data.size(); i++) {
          if (i * 2 < data.size()) {
             data.get(i).left = data.get(i * 2);
          } else {
             break;
          }
          if (i * 2 + 1 < data.size()) {
             data.get(i).right = data.get(i * 2 + 1);
          }
       }

        return data.get(1);
    }

    public static void main(String[] args) {
        BTreePrinter.printNode(test());
    }
}

class Node<T extends Comparable<?>> {
    Node<T> left, right;
    T data;

    public Node(T data) {
        this.data = data;
    }
}

class BTreePrinter {

    public static <T extends Comparable<?>> void printNode(Node<T> root) {
        int maxLevel = BTreePrinter.maxLevel(root);
        printNodeInternal(Collections.singletonList(root), 1, maxLevel);
    }

    private static <T extends Comparable<?>> void printNodeInternal(List<Node<T>> nodes, int level, int maxLevel) {
        if (nodes.isEmpty() || BTreePrinter.isAllElementsNull(nodes)) {
            return;
        }

        int floor = maxLevel - level + 1;
        int endgeLines = (int) Math.pow(2, (Math.max(floor - 1, 0)));
        int firstSpaces = (int) Math.pow(2, (floor)) - 1;
        int betweenSpaces = (int) Math.pow(2, (floor + 1)) - 1;

        BTreePrinter.printWhitespaces(firstSpaces);

        List<Node<T>> newNodes = new ArrayList<Node<T>>();
        for (Node<T> node : nodes) {
            if (node != null) {
                System.out.print(node.data);
                newNodes.add(node.left);
                newNodes.add(node.right);
            } else {
                newNodes.add(null);
                newNodes.add(null);
                System.out.print(" ");
            }

            if (node != null) {
               BTreePrinter.printWhitespaces(betweenSpaces - ((node.data + "").length() - 1));
            }
        }
        System.out.println();

        for (int i = 1; i <= endgeLines; i++) {
            for (int j = 0; j < nodes.size(); j++) {
                BTreePrinter.printWhitespaces(firstSpaces - i);
                if (nodes.get(j) == null) {
                    BTreePrinter.printWhitespaces(endgeLines + endgeLines + i + 1);
                    continue;
                }

                if (nodes.get(j).left != null) {
                    System.out.print("/");
                } else {
                    BTreePrinter.printWhitespaces(1);
                }

                BTreePrinter.printWhitespaces(i + i - 1);

                if (nodes.get(j).right != null) {
                    System.out.print("\\");
                } else {
                    BTreePrinter.printWhitespaces(1);
                }

                BTreePrinter.printWhitespaces(endgeLines + endgeLines - i);
            }
            System.out.println();
        }

        printNodeInternal(newNodes, level + 1, maxLevel);
    }

    private static void printWhitespaces(int count) {
        for (int i = 0; i < count; i++) {
            System.out.print(" ");
        }
    }

    private static <T extends Comparable<?>> int maxLevel(Node<T> node) {
        if (node == null) {
            return 0;
        }

        return Math.max(BTreePrinter.maxLevel(node.left), BTreePrinter.maxLevel(node.right)) + 1;
    }

    private static <T> boolean isAllElementsNull(List<T> list) {
        for (Object object : list) {
            if (object != null) {
                return false;
            }
        }

        return true;
    }
}
