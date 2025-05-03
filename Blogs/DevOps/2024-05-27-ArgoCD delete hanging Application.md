Had this multiple times in a larger ArgoCD setup: Applications got in a bad
state and became impossible to delete. Also happens sometimes with healthy 
applications one wants to delete. The only indication in the GUI is the 
resource spinner icon running forever.

The only thing that helps:

     kubectl patch Application/<name> -p '{"metadata":{"finalizers":[]}}' --type=merge
     kubectl delete Application/<name>

And the Application is immediately gone. Of course propability is high that
some type of cleanup did not happen...
