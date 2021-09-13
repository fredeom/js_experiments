
lines = map(lambda x: x.rstrip(), open('pairs.in').readlines());
print("  var pairs = {");
for pair in lines:
    if pair[0] in list('aeiouy') or pair[1] in list('aeiouy'):
        print("    \"" + pair + "\""+ ": \"-\",");
    else:
        print("    \"" + pair + "\""+ ": \"+\",");
print("  };");
