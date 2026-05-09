import json
from pathlib import Path
from networkx.readwrite import json_graph
import networkx as nx

data = json.loads(Path('graphify-out/graph.json').read_text(encoding='utf-8'))
G = json_graph.node_link_graph(data, edges='links')

# Find enrollment-related nodes
terms = ['enrollment', 'enroll', 'registration', 'getdb', 'db']
scored = []
for nid, ndata in G.nodes(data=True):
    label = ndata.get('label', '').lower()
    score = sum(1 for t in terms if t in label)
    if score > 0:
        scored.append((score, nid))
scored.sort(reverse=True)

print('=== Enrollment-related nodes ===')
for score, nid in scored[:15]:
    d = G.nodes[nid]
    src = d.get('source_file','')
    print(f"  {d.get('label', nid)} ({d.get('file_type','?')}) [src={src}]")

# Trace from enrollment POST to getDb
enroll_nodes = [nid for _, nid in scored if 'enroll' in G.nodes[nid].get('label','').lower() or 'registration' in G.nodes[nid].get('label','').lower()]
db_nodes = [n for n, d in G.nodes(data=True) if 'getdb' in d.get('label','').lower()]

if enroll_nodes and db_nodes:
    try:
        path = nx.shortest_path(G, enroll_nodes[0], db_nodes[0])
        print('\n=== Shortest path: Enrollment -> DB ===')
        for i, nid in enumerate(path):
            label = G.nodes[nid].get('label', nid)
            if i < len(path) - 1:
                edge = G.edges[nid, path[i+1]]
                rel = edge.get('relation', '')
                conf = edge.get('confidence', '')
                print(f'  {label} --{rel}--> [{conf}]')
            else:
                print(f'  {label}')
    except nx.NetworkXNoPath:
        print('\nNo direct path found. Showing enrollment node connections:')
        for nid in enroll_nodes[:3]:
            print(f"\n{G.nodes[nid].get('label', nid)} connects to:")
            for neighbor in G.neighbors(nid):
                edge = G.edges[nid, neighbor]
                print(f"  -> {G.nodes[neighbor].get('label', neighbor)} ({edge.get('relation','')}) [{edge.get('confidence','')}]")
else:
    print('\nNo enrollment or DB nodes found.')
